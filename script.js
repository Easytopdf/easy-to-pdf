// ڈارک/لائٹ موڈ ٹوگل
document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀ لائٹ موڈ" : "🌙 ڈارک موڈ";
});

// Drag & Drop فنکشنز
const dropArea = document.getElementById("dropArea");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const status = document.getElementById("status");

// ڈراپ ایریا پر تصاویر ڈراپ کرنے کی سپورٹ
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.background = "#e1f5fe";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.background = "";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.style.background = "";
    if (e.dataTransfer.files.length) {
        imageInput.files = e.dataTransfer.files;
        previewImages();
    }
});

// فائل منتخب کرنے پر پریویو دکھائیں
imageInput.addEventListener("change", previewImages);

// تصاویر کی پریویو دکھانے کا فنکشن
function previewImages() {
    imagePreview.innerHTML = "";
    if (!imageInput.files.length) return;

    Array.from(imageInput.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("preview-image");
            img.draggable = true;
            img.addEventListener("dragstart", dragStart);
            imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

// Drag & Drop سے ترتیب بدلیں
let draggedItem = null;

function dragStart(e) {
    draggedItem = e.target;
    setTimeout(() => {
        e.target.style.opacity = "0.5";
    }, 0);
}

imagePreview.addEventListener("dragover", (e) => {
    e.preventDefault();
});

imagePreview.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("preview-image") && draggedItem) {
        const targetIndex = Array.from(imagePreview.children).indexOf(e.target);
        const draggedIndex = Array.from(imagePreview.children).indexOf(draggedItem);
        
        if (targetIndex < draggedIndex) {
            imagePreview.insertBefore(draggedItem, e.target);
        } else {
            imagePreview.insertBefore(draggedItem, e.target.nextSibling);
        }
    }
    draggedItem.style.opacity = "1";
    draggedItem = null;
});

// PDF بنانے کا فنکشن
function convertToPDF() {
    if (!imagePreview.children.length) {
        status.textContent = "⚠ براہ کرم پہلے تصاویر منتخب کریں۔";
        return;
    }

    status.textContent = "⏳ PDF بنا رہا ہوں...";
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    Array.from(imagePreview.children).forEach((img, index) => {
        if (index > 0) pdf.addPage();
        pdf.addImage(img.src, "JPEG", 10, 10, 180, 120);
    });

    setTimeout(() => {
        pdf.save("converted_images.pdf");
        status.textContent = "✅ PDF ڈاؤن لوڈ ہو گیا!";
    }, 1000);
}

// تمام تصاویر صاف کریں
function clearAll() {
    imagePreview.innerHTML = "";
    imageInput.value = "";
    status.textContent = "";
}
