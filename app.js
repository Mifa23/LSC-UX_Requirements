/* ═══════════════════════════════════════════
   ACCESS GATE
   Set AUTH_ENABLED = true to re-enable the passcode screen
═══════════════════════════════════════════ */
const AUTH_ENABLED = false;
const ACCESS_CODE  = 'lsc-uxrequirements';
const SESSION_KEY  = 'lsc_auth';

const welcomeScreen = document.getElementById('welcomeScreen');
const mainApp       = document.getElementById('mainApp');
const accessForm    = document.getElementById('accessForm');
const accessInput   = document.getElementById('accessCode');
const accessError   = document.getElementById('accessError');
const toggleEye     = document.getElementById('toggleEye');

function showApp() {
  welcomeScreen.classList.add('hidden');
  mainApp.classList.remove('hidden');
}

// skip gate if disabled, otherwise resume session
if (!AUTH_ENABLED || sessionStorage.getItem(SESSION_KEY) === '1') showApp();

accessForm.addEventListener('submit', e => {
  e.preventDefault();
  const val = accessInput.value.trim();
  if (val === ACCESS_CODE) {
    sessionStorage.setItem(SESSION_KEY, '1');
    accessError.classList.add('hidden');
    accessInput.classList.remove('invalid');
    showApp();
  } else {
    accessInput.classList.add('invalid');
    accessError.classList.remove('hidden');
    accessInput.select();
  }
});

// show/hide toggle
toggleEye.addEventListener('click', () => {
  const isPassword = accessInput.type === 'password';
  accessInput.type = isPassword ? 'text' : 'password';
  document.getElementById('eyeIcon').setAttribute('opacity', isPassword ? '.5' : '1');
});

/* ═══════════════════════════════════════════
   FIREBASE CONFIG
   Paste your Firebase project config here.
   Get it from: Firebase Console → Project Settings → Your apps → </> (web)
═══════════════════════════════════════════ */
const firebaseConfig = {
  apiKey:            "AIzaSyB_uimD5AKmHLvRABLyApOhS6eT6aAPA4s",
  authDomain:        "lsc-ux-requirements.firebaseapp.com",
  databaseURL:       "https://lsc-ux-requirements-default-rtdb.firebaseio.com",
  projectId:         "lsc-ux-requirements",
  storageBucket:     "lsc-ux-requirements.firebasestorage.app",
  messagingSenderId: "426995456207",
  appId:             "1:426995456207:web:647a029e645bafe4d97fba"
};

firebase.initializeApp(firebaseConfig);
const db      = firebase.database();
const dataRef = db.ref('tableData');

/* ═══════════════════════════════════════════
   DATA  –  source: "UX Requirements" tab
   INITIAL_DATA is the seed used on first run.
   DATA is always loaded from / saved to Firebase.
═══════════════════════════════════════════ */
const INITIAL_DATA = [
  { requirement: "Branding customization", description: "Map JNJ branding elements: logo, and tokens: colors and icons", category: "App", solutionType: "OOTB Configuration", customLevel: "", release: "Post 0.5", priority: "Nice to have", scope: "Global", comments: "" },
  { requirement: "Overall Progress metrics", description: "Module configured for high level metrics of user / against plan", category: "Feature", solutionType: "Custom", customLevel: "TBD", release: "Post 0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "My Geo Overview metrics", description: "Module configured for high level metrics of territory / against plan", category: "Feature", solutionType: "Custom", customLevel: "TBD", release: "Post 0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Execution metrics", description: "Module configured for region specific 'execution' metrics", category: "Feature", solutionType: "Custom", customLevel: "TBD", release: "Post 0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "FSR/KAM Affiliations", description: "Module configured to show all the JnJ interactions against account and specific HCP", category: "Feature", solutionType: "Undefined", customLevel: "TBD", release: "Post 0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Customizable metrics by region", description: "Module configured for region specific metrics", category: "Feature", solutionType: "Custom", customLevel: "TBD", release: "Post 0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Image capture for samples", description: "User can 'scan' barcodes vs input data manually of samples", category: "Feature", solutionType: "Undefined", customLevel: "TBD", release: "Post 0.5", priority: "Nice to have", scope: "Global", comments: "" },
  { requirement: "Filters within cards at Homepage", description: "Can be solved with tabs or tags - User needs to filter table views to relevant data to task", category: "Feature", solutionType: "Custom", customLevel: "TBD", release: "R0.5", priority: "Should have", scope: "Global", comments: "" },
  { requirement: "Timestamp of last sync on page and configured module/card level", description: "Data citation, and 'last synced' can appear at page level, or module level", category: "Feature", solutionType: "Undefined", customLevel: "TBD", release: "R0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Active listening during conversations", description: "During Virtual or presentation of content, tool listens (after consent is given) for keywords to suggest content in the moment", category: "Agentforce", solutionType: "Undefined", customLevel: "TBD", release: "R0.5", priority: "Nice to have", scope: "Global", comments: "" },
  { requirement: "Replace Agentforce icon from agent button(s)", description: "Agentforce icon is replace with JnJ icon", category: "Agentforce", solutionType: "Undefined", customLevel: "TBD", release: "R0.5", priority: "Nice to have", scope: "Global", comments: "" },
  { requirement: "Remove any imagery related to Agentforce", description: "SF Illustrations are hidden in experience", category: "Agentforce", solutionType: "Undefined", customLevel: "TBD", release: "R0.5", priority: "Nice to have", scope: "Global", comments: "" },
  { requirement: "Rename AI agent", description: "Use JnJ or generic agent name", category: "Agentforce", solutionType: "Undefined", customLevel: "TBD", release: "R0.5", priority: "Nice to have", scope: "Global", comments: "" },
  { requirement: "AI assistance/actions based on page context", description: "Agent recognizes page context and data", category: "Agentforce", solutionType: "Undefined", customLevel: "TBD", release: "R0.5", priority: "Should have", scope: "Global", comments: "" },
  { requirement: "AI agent guided flows", description: "Add common user flows as tap-able prompts that then ask user the information needed to complete flow", category: "Agentforce", solutionType: "Undefined", customLevel: "TBD", release: "Post 0.5", priority: "Should have", scope: "Global", comments: "" },
  { requirement: "JnJ specific labels for navigation, filters, tool tips, guides, Therapeutic Area/Specialties, card titles - and translation map for all market languages", description: "JnJ specific language is contextually translated and validated by market for accuracy", category: "", solutionType: "", customLevel: "", release: "", priority: "Must have", scope: "", comments: "" },
  { requirement: "Rename navigation Account tab with HCP 360", description: "", category: "Feature", solutionType: "Undefined", customLevel: "TBD", release: "R0.5", priority: "Should have", scope: "Global", comments: "" },
  { requirement: "WCAG 2.1 AA Compliant", description: "Color contrast: Text contrast ≥ 4.5:1. Keyboard: All interactive controls reachable/operable via Tab/Shift+Tab and Enter/Space; visible focus indicator. Semantic structure: Logical heading order, page landmarks. Labels & form validation: Every input has a programmatic label. Clear affordances. Responsive & zoom: UI usable at 200% zoom; touch targets ≥ 44×44 px. No critical axe/Lighthouse failures.", category: "", solutionType: "", customLevel: "TBD", release: "R0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Fields not used in a region/market/Therapeutic area are hideable if not relevant", description: "Region and market can hide fields that are not relevant", category: "", solutionType: "", customLevel: "", release: "R0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Detect device", description: "Detect device (phone) from browser experience and layout in a responsive/phone first view, ability to hide unneeded tasks for personas/regions for phone based tasks", category: "Feature", solutionType: "", customLevel: "TBD", release: "Post 0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Language Translation in App – iPad and phone experience", description: "Region and market can translate all words into local language", category: "App", solutionType: "", customLevel: "", release: "R0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Ability to give system 'feedback' for any AI insight/recommended action", description: "User should be at least able to thumbs up or down any AI content to train system", category: "", solutionType: "", customLevel: "TBD", release: "R0.5", priority: "Should have", scope: "Global", comments: "" },
  { requirement: "Voice to Voice user interaction", description: "Language: Should be trained to understand JnJ products, workflows, regional colloquial terms, business jargon, and ask clarifying questions when confused. Interaction: User can 'pause' or 'save' (saves as draft) during V to V interaction.", category: "Agentforce", solutionType: "", customLevel: "TBD", release: "R0.5", priority: "Must have", scope: "Global", comments: "" },
  { requirement: "Usability: NN/M - Touch Targets", description: "Touch target standards recommend a minimum physical size of 1cm × 1cm (0.4in × 0.4in) for comfortable use and to prevent tapping errors. Buttons should not overlap each other's touch target.", category: "", solutionType: "", customLevel: "TBD", release: "R0.5", priority: "Should have", scope: "Global", comments: "" }
];

// Live data array — populated from Firebase on startup
const DATA = [];

// Write current DATA to Firebase (called after every mutation)
function saveData() {
  dataRef.set(DATA).catch(err => console.error('Firebase write failed:', err));
}

/* ═══════════════════════════════════════════
   DROPDOWN CONFIG
═══════════════════════════════════════════ */
const FIELD_CONFIG = {
  category: {
    type: 'pills',
    label: 'Category',
    options: [
      { value: 'App',        cls: 'badge-cat-app' },
      { value: 'Flow',       cls: 'badge-cat-flow' },
      { value: 'Feature',    cls: 'badge-cat-feature' },
      { value: 'Agentforce', cls: 'badge-cat-agent' },
    ]
  },
  solutionType: {
    type: 'list',
    label: 'Solution Type',
    options: ['OOTB Configuration', 'Custom', 'Undefined']
  },
  customLevel: {
    type: 'list',
    label: 'Customization Level',
    options: ['Very High', 'High', 'Medium', 'Low', 'TBD']
  },
  release: {
    type: 'list',
    label: 'Release Needed',
    options: ['R0.5', 'Post 0.5']
  },
  priority: {
    type: 'pills',
    label: 'Priority',
    options: [
      { value: 'Must have',    cls: 'badge-must' },
      { value: 'Should have',  cls: 'badge-should' },
      { value: 'Nice to have', cls: 'badge-nice' },
    ]
  },
  scope: {
    type: 'list',
    label: 'Scope',
    options: ['Global', 'Regional']
  }
};

/* ═══════════════════════════════════════════
   BADGE HELPERS
═══════════════════════════════════════════ */
function categoryBadge(v) {
  const map = { App:'badge-cat-app', Flow:'badge-cat-flow', Feature:'badge-cat-feature', Agentforce:'badge-cat-agent' };
  if (!v) return '<span class="cell-empty">—</span>';
  return `<span class="badge ${map[v] || 'badge-cat-other'}">${esc(v)}</span>`;
}
function priorityBadge(v) {
  const map = { 'Must have':'badge-must', 'Should have':'badge-should', 'Nice to have':'badge-nice' };
  if (!v) return '<span class="cell-empty">—</span>';
  return `<span class="badge ${map[v] || ''}">${esc(v)}</span>`;
}
function releaseBadge(v) {
  if (!v) return '<span class="cell-empty">—</span>';
  return `<span>${esc(v)}</span>`;
}
function plainVal(v) {
  return v ? `<span>${esc(v)}</span>` : '<span class="cell-empty">—</span>';
}
function esc(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const CHEVRON = `<svg class="cell-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

/* ═══════════════════════════════════════════
   STATE
═══════════════════════════════════════════ */
let currentView = 'table';
let sortCol = -1, sortDir = 1;
let filteredData = [...DATA];
let activeDropdown = null;

/* ═══════════════════════════════════════════
   THEME
═══════════════════════════════════════════ */
const htmlEl = document.documentElement;
const darkToggle = document.getElementById('darkModeToggle');
const themeLabel = document.getElementById('themeLabel');

function updateThemeLabel(isDark) {
  themeLabel.textContent = isDark ? 'ON' : 'OFF';
}

if (localStorage.getItem('theme') === 'dark') {
  htmlEl.setAttribute('data-theme', 'dark');
  darkToggle.checked = true;
}
updateThemeLabel(darkToggle.checked);

darkToggle.addEventListener('change', () => {
  const isDark = darkToggle.checked;
  htmlEl.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeLabel(isDark);
});

/* ═══════════════════════════════════════════
   VIEW TOGGLE
═══════════════════════════════════════════ */
document.getElementById('tableViewBtn').addEventListener('click', () => {
  currentView = 'table';
  document.getElementById('tableViewBtn').classList.add('active');
  document.getElementById('cardViewBtn').classList.remove('active');
  document.getElementById('tableView').classList.add('active');
  document.getElementById('cardView').classList.remove('active');
  render();
});
document.getElementById('cardViewBtn').addEventListener('click', () => {
  currentView = 'card';
  document.getElementById('cardViewBtn').classList.add('active');
  document.getElementById('tableViewBtn').classList.remove('active');
  document.getElementById('cardView').classList.add('active');
  document.getElementById('tableView').classList.remove('active');
  render();
});

/* ═══════════════════════════════════════════
   FILTERS
═══════════════════════════════════════════ */
const filterCategory = document.getElementById('filterCategory');
const filterPriority  = document.getElementById('filterPriority');
const filterRelease   = document.getElementById('filterRelease');
const clearFiltersBtn = document.getElementById('clearFilters');
const recordCount     = document.getElementById('recordCount');

function applyFilters() {
  const cat = filterCategory.value;
  const pri = filterPriority.value;
  const rel = filterRelease.value;
  filteredData = DATA.filter(row => {
    if (cat && row.category !== cat) return false;
    if (pri && row.priority !== pri) return false;
    if (rel && row.release !== rel) return false;
    return true;
  });
  if (sortCol >= 0) applySort(false);
  updateRecordCount();
  render();
}
function updateRecordCount() {
  recordCount.textContent = `${filteredData.length} requirement${filteredData.length !== 1 ? 's' : ''}`;
}
clearFiltersBtn.addEventListener('click', () => {
  filterCategory.value = '';
  filterPriority.value = '';
  filterRelease.value = '';
  applyFilters();
});
filterCategory.addEventListener('change', applyFilters);
filterPriority.addEventListener('change', applyFilters);
filterRelease.addEventListener('change', applyFilters);

/* ═══════════════════════════════════════════
   SORT
═══════════════════════════════════════════ */
const colKeys = ['requirement','description','category','solutionType','customLevel','release','priority','scope','comments'];
document.querySelectorAll('th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = parseInt(th.dataset.col);
    sortDir = sortCol === col ? sortDir * -1 : 1;
    sortCol = col;
    document.querySelectorAll('th').forEach(t => t.classList.remove('sorted-asc','sorted-desc'));
    th.classList.add(sortDir === 1 ? 'sorted-asc' : 'sorted-desc');
    applySort(true);
  });
});
function applySort(rerender) {
  const key = colKeys[sortCol];
  filteredData.sort((a,b) => {
    const av = (a[key]||'').toLowerCase(), bv = (b[key]||'').toLowerCase();
    return av < bv ? -sortDir : av > bv ? sortDir : 0;
  });
  if (rerender) render();
}

/* ═══════════════════════════════════════════
   EXPORT CSV
═══════════════════════════════════════════ */
document.getElementById('exportCsvBtn').addEventListener('click', () => {
  const headers = ['Requirement','Short Description','Category','Solution Type','Customization Level','Release','Priority','Scope','Additional Comments'];
  const rows = filteredData.map(r =>
    [r.requirement,r.description,r.category,r.solutionType,r.customLevel,r.release,r.priority,r.scope,r.comments]
    .map(v => `"${(v||'').replace(/"/g,'""')}"`).join(',')
  );
  const csv = [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: 'JNJ_LSC_Experience_Requirements.csv' });
  a.click();
  URL.revokeObjectURL(url);
});

/* ═══════════════════════════════════════════
   MODAL
═══════════════════════════════════════════ */
let modalEditIdx = null; // null = new row

const backdrop    = document.getElementById('modalBackdrop');
const modalTitle  = document.getElementById('modalTitle');
const modalClose  = document.getElementById('modalClose');
const modalCancel = document.getElementById('modalCancel');
const modalSave   = document.getElementById('modalSave');

const mReq      = document.getElementById('mReq');
const mDesc     = document.getElementById('mDesc');
const mSolution = document.getElementById('mSolution');
const mCustom   = document.getElementById('mCustom');
const mRelease  = document.getElementById('mRelease');
const mScope    = document.getElementById('mScope');
const mComments = document.getElementById('mComments');

function openModal(row, idx) {
  modalEditIdx = idx !== undefined ? idx : null;
  modalTitle.textContent = modalEditIdx === null ? 'Add Requirement' : 'Edit Requirement';

  // populate fields
  const r = row || {};
  mReq.value      = r.requirement  || '';
  mDesc.value     = r.description  || '';
  mSolution.value = r.solutionType || '';
  mCustom.value   = r.customLevel  || '';
  mRelease.value  = r.release      || '';
  mScope.value    = r.scope        || '';
  mComments.value = r.comments     || '';

  // set pill selections
  setPillSelection('mCategory', r.category || '');
  setPillSelection('mPriority',  r.priority  || '');

  // clear any previous validation state
  document.querySelectorAll('.modal-error').forEach(el => el.classList.add('hidden'));
  mReq.classList.remove('invalid');
  document.getElementById('mPriority').classList.remove('invalid');

  backdrop.classList.remove('hidden');
  mReq.focus();
}

function closeModal() {
  backdrop.classList.add('hidden');
  modalEditIdx = null;
}

function setPillSelection(groupId, value) {
  document.querySelectorAll(`#${groupId} .modal-pill`).forEach(pill => {
    pill.classList.toggle('selected', pill.dataset.value === value);
  });
}

function getSelectedPill(groupId) {
  const sel = document.querySelector(`#${groupId} .modal-pill.selected`);
  return sel ? sel.dataset.value : '';
}

// pill click toggle
document.querySelectorAll('.modal-pills').forEach(group => {
  group.addEventListener('click', e => {
    const pill = e.target.closest('.modal-pill');
    if (!pill) return;
    const alreadySelected = pill.classList.contains('selected');
    group.querySelectorAll('.modal-pill').forEach(p => p.classList.remove('selected'));
    if (!alreadySelected) pill.classList.add('selected');
  });
});

// close triggers
modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !backdrop.classList.contains('hidden')) closeModal(); });

// save
modalSave.addEventListener('click', () => {
  // clear previous errors
  let valid = true;
  document.querySelectorAll('.modal-error').forEach(el => el.classList.add('hidden'));
  mReq.classList.remove('invalid');
  document.getElementById('mPriority').classList.remove('invalid');

  // validate required: Requirement
  if (!mReq.value.trim()) {
    mReq.classList.add('invalid');
    document.getElementById('errReq').classList.remove('hidden');
    valid = false;
  }

  // validate required: Priority
  if (!getSelectedPill('mPriority')) {
    document.getElementById('mPriority').classList.add('invalid');
    document.getElementById('errPriority').classList.remove('hidden');
    valid = false;
  }

  if (!valid) return;

  const row = {
    requirement:  mReq.value.trim(),
    description:  mDesc.value.trim(),
    category:     getSelectedPill('mCategory'),
    solutionType: mSolution.value,
    customLevel:  mCustom.value,
    release:      mRelease.value,
    priority:     getSelectedPill('mPriority'),
    scope:        mScope.value,
    comments:     mComments.value.trim(),
  };

  if (modalEditIdx !== null) {
    DATA[modalEditIdx] = row;
  } else {
    DATA.push(row);
  }

  saveData();
  closeModal();
  applyFilters();

  if (currentView === 'table' && modalEditIdx === null) {
    setTimeout(() => {
      document.getElementById('tableBody')?.lastElementChild?.scrollIntoView({ behavior:'smooth', block:'center' });
    }, 100);
  }
});

/* ═══════════════════════════════════════════
   FAB
═══════════════════════════════════════════ */
document.getElementById('addReqBtn').addEventListener('click', () => openModal(null));

/* ═══════════════════════════════════════════
   RENDER – TABLE
═══════════════════════════════════════════ */
function renderTable() {
  const tbody = document.getElementById('tableBody');
  const noResults = document.getElementById('noResults');
  if (filteredData.length === 0) { tbody.innerHTML = ''; noResults.classList.remove('hidden'); return; }
  noResults.classList.add('hidden');

  tbody.innerHTML = filteredData.map((row, i) => {
    const idx = DATA.indexOf(row);
    return `<tr data-idx="${idx}" draggable="true">
      <td class="drag-handle" title="Drag to reorder">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="15" cy="5" r="1" fill="currentColor"/>
          <circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/>
          <circle cx="9" cy="19" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/>
        </svg>
      </td>
      <td class="editable editable-text" data-field="requirement">${esc(row.requirement) || '<span class="cell-empty">Click to edit…</span>'}</td>
      <td class="editable editable-text" data-field="description">${esc(row.description) || '<span class="cell-empty">Click to edit…</span>'}</td>
      <td class="editable editable-select" data-field="category">
        <div class="cell-value">${categoryBadge(row.category)}${CHEVRON}</div>
      </td>
      <td class="editable editable-select" data-field="solutionType">
        <div class="cell-value">${plainVal(row.solutionType)}${CHEVRON}</div>
      </td>
      <td class="editable editable-select" data-field="customLevel">
        <div class="cell-value">${plainVal(row.customLevel)}${CHEVRON}</div>
      </td>
      <td class="editable editable-select" data-field="release">
        <div class="cell-value">${releaseBadge(row.release)}${CHEVRON}</div>
      </td>
      <td class="editable editable-select" data-field="priority">
        <div class="cell-value">${priorityBadge(row.priority)}${CHEVRON}</div>
      </td>
      <td class="editable editable-select" data-field="scope">
        <div class="cell-value">${plainVal(row.scope)}${CHEVRON}</div>
      </td>
      <td class="editable editable-text" data-field="comments" style="font-style:italic;color:var(--text-muted)">${esc(row.comments)}</td>
    </tr>`;
  }).join('');

  // attach cell click handlers
  tbody.querySelectorAll('td.editable-text').forEach(td => td.addEventListener('click', onTextCellClick));
  tbody.querySelectorAll('td.editable-select').forEach(td => td.addEventListener('click', onSelectCellClick));

  // drag-and-drop reorder
  initDragAndDrop(tbody);
}

/* ═══════════════════════════════════════════
   DRAG & DROP ROW REORDER
═══════════════════════════════════════════ */
let dragSrc = null;

function initDragAndDrop(tbody) {
  tbody.querySelectorAll('tr').forEach(tr => {
    tr.addEventListener('dragstart', e => {
      dragSrc = tr;
      tr.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', tr.dataset.idx);
    });

    tr.addEventListener('dragend', () => {
      tr.classList.remove('dragging');
      tbody.querySelectorAll('tr').forEach(r => r.classList.remove('drag-over'));
      dragSrc = null;
    });

    tr.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (dragSrc && dragSrc !== tr) {
        tbody.querySelectorAll('tr').forEach(r => r.classList.remove('drag-over'));
        tr.classList.add('drag-over');
      }
    });

    tr.addEventListener('dragleave', () => tr.classList.remove('drag-over'));

    tr.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragSrc || dragSrc === tr) return;
      tr.classList.remove('drag-over');

      const fromIdx = parseInt(dragSrc.dataset.idx);
      const toIdx   = parseInt(tr.dataset.idx);

      // reorder DATA in place
      const fromPos = DATA.indexOf(DATA[fromIdx]);
      const toPos   = DATA.indexOf(DATA[toIdx]);
      const [moved] = DATA.splice(fromPos, 1);
      DATA.splice(toPos, 0, moved);

      saveData();
      applyFilters();
    });
  });

  // only allow drag from the handle
  tbody.querySelectorAll('td.drag-handle').forEach(handle => {
    handle.addEventListener('mousedown', () => {
      handle.closest('tr').setAttribute('draggable', 'true');
    });
  });

  tbody.querySelectorAll('tr').forEach(tr => {
    tr.addEventListener('mousedown', e => {
      if (!e.target.closest('.drag-handle')) {
        tr.setAttribute('draggable', 'false');
      }
    });
  });
}

/* ═══════════════════════════════════════════
   INLINE TEXT EDITING
═══════════════════════════════════════════ */
function onTextCellClick(e) {
  const td = e.currentTarget;
  if (td.querySelector('textarea')) return; // already editing
  closeDropdown();

  const tr    = td.closest('tr');
  const idx   = parseInt(tr.dataset.idx);
  const field = td.dataset.field;
  const cur   = DATA[idx][field] || '';

  const ta = document.createElement('textarea');
  ta.className = 'cell-textarea';
  ta.value = cur;
  ta.rows = 3;

  td.innerHTML = '';
  td.appendChild(ta);
  ta.focus();
  ta.setSelectionRange(ta.value.length, ta.value.length);

  function save() {
    DATA[idx][field] = ta.value.trim();
    saveData();
    applyFilters();
  }
  ta.addEventListener('blur', save, { once: true });
  ta.addEventListener('keydown', e => {
    if (e.key === 'Escape') { ta.value = cur; ta.blur(); }
    e.stopPropagation();
  });
}

/* ═══════════════════════════════════════════
   DROPDOWN SELECTION
═══════════════════════════════════════════ */
function onSelectCellClick(e) {
  e.stopPropagation();
  const td    = e.currentTarget;
  const tr    = td.closest('tr');
  const idx   = parseInt(tr.dataset.idx);
  const field = td.dataset.field;
  const cfg   = FIELD_CONFIG[field];
  if (!cfg) return;

  // close any open dropdown first
  if (activeDropdown && activeDropdown.td === td) { closeDropdown(); return; }
  closeDropdown();

  const panel = document.createElement('div');
  panel.className = 'cell-dropdown';

  const lbl = document.createElement('div');
  lbl.className = 'cell-dropdown-label';
  lbl.textContent = cfg.label;
  panel.appendChild(lbl);

  const current = DATA[idx][field];

  if (cfg.type === 'pills') {
    const wrap = document.createElement('div');
    wrap.className = 'dd-pills';
    cfg.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = `dd-pill badge ${opt.cls}${current === opt.value ? ' selected' : ''}`;
      btn.textContent = opt.value;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        DATA[idx][field] = opt.value;
        saveData();
        closeDropdown();
        applyFilters();
      });
      wrap.appendChild(btn);
    });
    panel.appendChild(wrap);
  } else {
    const list = document.createElement('div');
    list.className = 'dd-list';
    cfg.options.forEach(val => {
      const btn = document.createElement('button');
      btn.className = `dd-item${current === val ? ' selected' : ''}`;
      btn.textContent = val;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        DATA[idx][field] = val;
        saveData();
        closeDropdown();
        applyFilters();
      });
      list.appendChild(btn);
    });
    panel.appendChild(list);
  }

  // clear option
  if (current) {
    const clearWrap = document.createElement('div');
    clearWrap.className = 'dd-clear dd-list';
    const clearBtn = document.createElement('button');
    clearBtn.className = 'dd-item';
    clearBtn.textContent = '✕  Clear';
    clearBtn.addEventListener('click', e => {
      e.stopPropagation();
      DATA[idx][field] = '';
      saveData();
      closeDropdown();
      applyFilters();
    });
    clearWrap.appendChild(clearBtn);
    panel.appendChild(clearWrap);
  }

  // position panel
  document.body.appendChild(panel);
  const rect = td.getBoundingClientRect();
  const panelW = 220;
  let left = rect.left;
  let top  = rect.bottom + 4;
  if (left + panelW > window.innerWidth - 8) left = window.innerWidth - panelW - 8;
  if (top + panel.offsetHeight > window.innerHeight - 8) top = rect.top - panel.offsetHeight - 4;
  panel.style.left = `${left}px`;
  panel.style.top  = `${top}px`;
  panel.style.width = `${panelW}px`;

  activeDropdown = { panel, td };
}

function closeDropdown() {
  if (activeDropdown) {
    activeDropdown.panel.remove();
    activeDropdown = null;
  }
}

document.addEventListener('click', closeDropdown);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDropdown(); });

/* ═══════════════════════════════════════════
   RENDER – CARDS
═══════════════════════════════════════════ */
const ICON_GLOBE = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
const ICON_PIN   = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

function renderCards() {
  const grid = document.getElementById('cardGrid');
  const noResults = document.getElementById('noResultsCard');
  if (filteredData.length === 0) { grid.innerHTML = ''; noResults.classList.remove('hidden'); return; }
  noResults.classList.add('hidden');

  grid.innerHTML = filteredData.map((row, _i) => {

    const idx = DATA.indexOf(row);
    // Inline meta: Solution Type · Customization Level · Release Needed (always 3 values)
    const metaParts = [
      esc(row.solutionType) || '–',
      esc(row.customLevel)  || '–',
      esc(row.release)      || '–',
    ];
    const inlineMeta = `<div class="card-inline-meta">${metaParts.join('<span class="card-meta-sep">·</span>')}</div>`;

    // Scope icon
    const scopeIcon = row.scope === 'Regional' ? ICON_PIN : ICON_GLOBE;

    return `
    <div class="req-card" data-idx="${idx}" style="cursor:pointer">
      <!-- top section -->
      <div class="card-body">
        <div class="card-header">
          <div class="card-title">${esc(row.requirement) || '<em style="color:var(--text-muted)">Untitled</em>'}</div>
          ${row.priority ? priorityBadge(row.priority) : ''}
        </div>
        <div class="card-field">
          <span class="card-field-label">Short Description</span>
          ${row.description ? `<span class="card-desc">${esc(row.description)}</span>` : ''}
        </div>
        ${inlineMeta}
        <div class="card-comments">
          <span class="card-comments-label">Additional comments</span>
          ${row.comments ? `<span class="card-comments-text">${esc(row.comments)}</span>` : ''}
        </div>
      </div>

      <!-- bottom section — divider pinned to bottom -->
      <div class="card-footer">
        <div class="card-footer-left">
          ${row.category ? categoryBadge(row.category) : '<span></span>'}
        </div>
        <div class="card-scope">
          ${scopeIcon}
          <span>${esc(row.scope) || '—'}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  // card click → open modal for editing
  grid.querySelectorAll('.req-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.idx);
      openModal(DATA[idx], idx);
    });
  });
}

/* ═══════════════════════════════════════════
   RENDER (dispatcher)
═══════════════════════════════════════════ */
function render() {
  if (currentView === 'table') renderTable();
  else renderCards();
}

/* ═══════════════════════════════════════════
   INIT – load data from Firebase then render
═══════════════════════════════════════════ */
(async function init() {
  try {
    const snapshot = await dataRef.get();
    if (snapshot.exists()) {
      // Hydrate DATA from Firebase
      const saved = snapshot.val();
      if (Array.isArray(saved)) saved.forEach(r => DATA.push(r));
    } else {
      // First run: seed Firebase with INITIAL_DATA
      INITIAL_DATA.forEach(r => DATA.push({ ...r }));
      await dataRef.set(DATA);
    }
  } catch (err) {
    console.warn('Firebase load failed, falling back to INITIAL_DATA:', err);
    INITIAL_DATA.forEach(r => DATA.push({ ...r }));
  }
  updateRecordCount();
  render();
})();
