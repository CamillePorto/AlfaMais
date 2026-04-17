// ============================================================
//  ALFA+ · Configuração do Supabase
//  ➜ Substitua SUPABASE_URL e SUPABASE_ANON_KEY pelos seus
//    valores em: https://supabase.com → seu projeto → Settings → API
// ============================================================

const SUPABASE_URL  = 'https://mpwntzfaeihctxxxmthh.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wd250emZhZWloY3R4eHhtdGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0Mzg4MDEsImV4cCI6MjA5MjAxNDgwMX0.AgmTTZzVmO9Wl_EKiZKkVSwQF7v49cVZSkYXS4VRVME';

// Inicializa o cliente Supabase (UMD já carregado via CDN nas páginas)
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── helpers de autenticação ────────────────────────────────
async function getSession() {
  const { data } = await db.auth.getSession();
  return data.session;
}

async function getUser() {
  const s = await getSession();
  return s ? s.user : null;
}

async function requireAuth(redirectTo = 'login.html') {
  const u = await getUser();
  if (!u) { window.location.href = redirectTo; }
  return u;
}

async function requireInstrutor(redirectTo = 'dashboard.html') {
  const u = await requireAuth();
  const { data } = await db.from('perfis').select('papel').eq('id', u.id).single();
  if (!data || data.papel !== 'instrutor') { window.location.href = redirectTo; }
  return u;
}

// ─── helpers de perfil ──────────────────────────────────────
async function getPerfil(userId) {
  const { data } = await db.from('perfis').select('*').eq('id', userId).single();
  return data;
}

async function getProgresso(userId) {
  const { data } = await db.from('progresso').select('*').eq('user_id', userId);
  return data || [];
}

async function salvarProgresso(userId, modulo, licao, acertos, total) {
  await db.from('progresso').upsert({
    user_id: userId,
    modulo,
    licao,
    acertos,
    total,
    pct: Math.round(acertos / total * 100),
    atualizado_em: new Date().toISOString()
  }, { onConflict: 'user_id,modulo,licao' });
}

// ─── fala (TTS acessível) ───────────────────────────────────
function falar(texto, devagar = false) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = 'pt-BR';
  u.rate = devagar ? 0.55 : 0.88;
  speechSynthesis.speak(u);
}

// ─── vibração acessível ─────────────────────────────────────
function vibrar(ms = 60) {
  if (navigator.vibrate) navigator.vibrate(ms);
}
