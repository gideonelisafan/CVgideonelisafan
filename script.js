const sheetID = "1nW1isLp68kAQLzLcCm84Og-Q5dath91TP_Rz76QgSAk";

const urls = {
  profile: `https://opensheet.elk.sh/${sheetID}/profile`,
  experience: `https://opensheet.elk.sh/${sheetID}/experience`,
  education: `https://opensheet.elk.sh/${sheetID}/education`,
  achievements: `https://opensheet.elk.sh/${sheetID}/achievements`
};

// ================= PROFILE =================
fetch(urls.profile)
  .then(res => res.json())
  .then(data => {
    const user = data[0];

    if (!user) return;

    document.getElementById("name").innerText = user.name || "-";
    document.getElementById("listeners").innerText = user.listeners || "-";
    document.getElementById("profileImage").src = user.image || "";

    document.getElementById("linkedin").href = user.linkedin || "#";
    document.getElementById("email").href = "mailto:" + (user.email || "");
    document.getElementById("phone").href = "tel:" + (user.phone || "");

    document.getElementById("skills").innerText = user.skills || "-";
    document.getElementById("interests").innerText = user.interests || "-";
  })
  .catch(err => console.error("Profile error:", err));


// ================= EXPERIENCE =================
fetch(urls.experience)
  .then(res => res.json())
  .then(data => {
    let html = "";

    data.forEach(d => {
      html += `
        <div class="item">
          <div class="item-title">${d.title || "-"}</div>
          <div class="item-sub">${d.date || "-"}</div>
          <div class="item-desc">${d.desc || "-"}</div>
        </div>
      `;
    });

    document.getElementById("experience").innerHTML = html;
  })
  .catch(err => console.error("Experience error:", err));


// ================= EDUCATION =================
fetch(urls.education)
  .then(res => res.json())
  .then(data => {
    let html = "";

    data.forEach(d => {
      html += `
        <div class="item">
          <div class="item-title">${d.title || "-"}</div>
          <div class="item-sub">${d.date || "-"}</div>
        </div>
      `;
    });

    document.getElementById("education").innerHTML = html;
  })
  .catch(err => console.error("Education error:", err));

// ================= ACHIEVEMENTS =================
fetch(urls.achievements)
  .then(res => res.json())
  .then(data => {
    let html = "";

    data.forEach(d => {
      // 1. Ambil nilai type dan jadikan huruf kecil semua agar mudah dicek
      let itemType = d.type ? d.type.toLowerCase().trim() : "";
      
      // 2. Tentukan ikon berdasarkan tipe
      let icon = "🏆"; // Ikon default
      if (itemType === "sertifikat") {
        icon = "📜"; // Ikon untuk sertifikat
      } else if (itemType === "penghargaan") {
        icon = "🏆"; // Ikon untuk penghargaan
      }

      // 3. Masukkan ke dalam HTML
      html += `
        <div class="achievement-item">
          <span class="achievement-icon">${icon}</span>
          <span class="achievement-text">${d.title || "-"}</span>
        </div>
      `;
    });

    document.getElementById("achievements").innerHTML = html;
  })
  .catch(err => console.error("Achievements error:", err));