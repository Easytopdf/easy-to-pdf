// Add Cropper.js library (in HTML head)
<link href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js"></script>

// Initialize Cropper
let cropper;
document.getElementById("cropBtn").addEventListener("click", function() {
    const img = document.querySelector("#imagePreview img");
    cropper = new Cropper(img, { aspectRatio: NaN }); // Free-form crop
});

// Apply Crop
function applyCrop() {
    const croppedCanvas = cropper.getCroppedCanvas();
    document.getElementById("imagePreview").innerHTML = "";
    imagePreview.appendChild(croppedCanvas);
}
