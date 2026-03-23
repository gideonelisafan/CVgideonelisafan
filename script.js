// Ganti dengan Google Sheet ID kamu yang sebenarnya
const sheetID = "1nW1isLp68kAQLzLcCm84Og-Q5dath91TP_Rz76QgSAk";

const urls = {
  profile: `https://opensheet.elk.sh/${sheetID}/profile`,
  experience: `https://opensheet.elk.sh/${sheetID}/experience`,
  projects: `https://opensheet.elk.sh/${sheetID}/projects`,
  education: `https://opensheet.elk.sh/${sheetID}/education`,
  achievements: `https://opensheet.elk.sh/${sheetID}/achievements`
};

// ================= FUNGSI SKELETON LOADER =================
function showSkeletons() {
  const listContainers = document.querySelectorAll('.list-container');
  listContainers.forEach(container => {
    let skeletonHtml = '';
    for (let i = 0; i < 2; i++) {
      skeletonHtml += `
        <div class="list-item skeleton-item">
          <div class="item-meta">
            <span class="skeleton-box" style="width: 100%; height: 12px; margin-left:auto;"></span>
          </div>
          <div class="item-content">
            <h3 class="skeleton-box" style="width: 70%; height: 14px;"></h3>
            <p class="skeleton-box" style="width: 40%; height: 12px; margin-top: 8px;"></p>
          </div>
        </div>
      `;
    }
    container.innerHTML = skeletonHtml;
  });
}

function removeSkeletonClass(id) {
  const container = document.getElementById(id);
  if (container) {
    container.classList.remove('skeleton-loading');
  }
}

// Tampilkan skeleton segera setelah JS dimuat
showSkeletons();

// Start Fetching Data secara terpisah agar tidak saling menggagalkan
fetchProfile();
fetchSection(urls.experience, "experience", renderListItems);
fetchSection(urls.projects, "projects", renderListItems);
fetchSection(urls.education, "education", renderListItems);
fetchSection(urls.achievements, "achievements", renderAchievements);

// ================= FUNGSI FETCH TERPISAH =================

async function fetchProfile() {
  try {
    const res = await fetch(urls.profile);
    const data = await res.json();
    
    if (Array.isArray(data) && data.length > 0) {
      const p = data[0]; 
      document.getElementById("name").innerText = p.name || "Nama";
      document.getElementById("name").classList.remove('loading-placeholder-text');
      document.getElementById("listeners").innerText = `${p.listeners || '0'} monthly listeners`;
      
      if (p.imageUrl) document.getElementById("profileImage").src = p.imageUrl;
      if (p.linkedinUrl) document.getElementById("linkedin").href = p.linkedinUrl;
      
      if (p.email) {
          document.getElementById("email").innerText = p.email;
          document.getElementById("email").href = `mailto:${p.email}`;
      }
      if (p.phone) {
          document.getElementById("phone").innerText = p.phone;
          document.getElementById("phone").href = `tel:${p.phone}`;
      }
      
      if (p.skills) {
          document.getElementById("skills").innerText = p.skills;
          document.getElementById("skills").classList.remove('loading-placeholder-text');
      }
      if (p.interests) {
          document.getElementById("interests").innerText = p.interests;
          document.getElementById("interests").classList.remove('loading-placeholder-text');
      }
    }
  } catch (error) {
    console.error("Error memuat profil:", error);
  }
}

// Fungsi umum untuk mengambil data per bagian
async function fetchSection(url, containerId, renderFunction) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    // Pastikan data yang dikembalikan adalah array (tidak error)
    if (Array.isArray(data)) {
      renderFunction(containerId, data);
    } else {
      throw new Error("Data bukan array atau tab tidak ditemukan");
    }
  } catch (error) {
    console.error(`Error memuat ${containerId}:`, error);
    removeSkeletonClass(containerId);
    document.getElementById(containerId).innerHTML = '<p style="font-size:12px;color:#A7A7A7;padding:15px;">Belum ada data atau tab tidak ditemukan.</p>';
  }
}

// --- FUNGSI HELPER UNTUK RENDER LIST ---
function renderListItems(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;
  
  removeSkeletonClass(containerId); 
  
  if (data.length === 0) {
    container.innerHTML = '<p style="font-size:12px;color:#A7A7A7;padding:15px;">Belum ada data.</p>';
    return;
  }

  let html = "";
  data.forEach(d => {
    html += `
      <div class="list-item">
        <div class="item-meta">${d.time || "-"}</div>
        <div class="item-content">
          <h3 class="item-title">${d.title || "-"}</h3>
          <span class="item-sub">${d.sub || "-"}</span>
          ${d.desc ? `<p class="item-desc">${d.desc}</p>` : ''}
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// --- FUNGSI HELPER UNTUK RENDER ACHIEVEMENTS ---
function renderAchievements(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container || !data) return;

  removeSkeletonClass(containerId); 

  if (data.length === 0) {
      container.innerHTML = '<p style="font-size:12px;color:#A7A7A7;padding:15px;">Belum ada data.</p>';
      return;
  }

  let html = "";
  data.forEach(d => {
      let itemType = d.type ? d.type.toLowerCase().trim() : "";
      
      let icon = "🏆"; 
      if (itemType === "sertifikat" || itemType === "certificate") {
          icon = "📜"; 
      }

      html += `
          <div class="achievement-item">
              <span class="achievement-icon">${icon}</span>
              <span class="achievement-text">${d.title || "-"}</span>
          </div>
      `;
  });
  container.innerHTML = html;
}