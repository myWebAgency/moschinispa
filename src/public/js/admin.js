/* ══════════════════════════════════════════════════
   Admin JS — Moschini S.p.A.
   ══════════════════════════════════════════════════ */

/* ── SIDEBAR TOGGLE (mobile) ──────────────────── */
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('mobileOverlay').classList.toggle('open');
}
window.toggleSidebar = toggleSidebar;

document.querySelectorAll('.sb-link').forEach(function(l){
  l.addEventListener('click',function(){
    if(window.innerWidth <= 900){
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('mobileOverlay').classList.remove('open');
    }
  });
});

/* ── RICH TEXT EDITOR (Quill) ─────────────────── */
document.querySelectorAll('[data-richtext]').forEach(function(el){
  var hiddenInput = el.querySelector('textarea, input[type="hidden"]');
  if(!hiddenInput) return;

  var editorDiv = document.createElement('div');
  editorDiv.className = 'richtext-editor';
  editorDiv.innerHTML = hiddenInput.value;
  hiddenInput.style.display = 'none';
  hiddenInput.insertAdjacentElement('afterend', editorDiv);

  var toolbarOptions = [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ];

  var quill = new Quill(editorDiv, {
    theme: 'snow',
    modules: { toolbar: toolbarOptions },
    placeholder: 'Scrivi qui...',
  });

  // Sync content back to hidden input on form submit
  var form = hiddenInput.closest('form');
  if(form){
    form.addEventListener('submit', function(){
      var html = quill.root.innerHTML;
      if(html === '<p><br></p>') html = '';
      hiddenInput.value = html;
    });
  }
});

/* ── MEDIA SIDE PANEL ─────────────────────────── */
(function(){
  var panel = document.getElementById('mediaSidePanel');
  if(!panel) return;

  var overlay = document.getElementById('mediaPanelOverlay');
  var closeBtn = panel.querySelector('.msp-close');
  var panelImg = document.getElementById('mspImage');
  var panelName = document.getElementById('mspName');
  var panelSize = document.getElementById('mspSize');
  var panelCategory = document.getElementById('mspCategory');
  var panelAlt = document.getElementById('mspAlt');
  var panelCatSelect = document.getElementById('mspCatSelect');
  var panelFormAction = document.getElementById('mspFormAction');
  var panelDeleteForm = document.getElementById('mspDeleteForm');
  var panelOpenLink = document.getElementById('mspOpenLink');
  var panelCopyBtn = document.getElementById('mspCopyUrl');
  var variantsSection = document.getElementById('mspVariantsSection');
  var variantsContainer = document.getElementById('mspVariants');

  var variantLabels = { small: 'Small (400px)', medium: 'Medium (800px)', large: 'Large (1600px)' };

  function formatSize(bytes){
    if(bytes < 1024) return bytes + ' B';
    if(bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(2) + ' MB';
  }

  function renderVariants(variants){
    if(!variants || variants.length === 0){
      variantsSection.style.display = 'none';
      return;
    }
    variantsSection.style.display = 'block';
    variantsContainer.innerHTML = '';

    variants.forEach(function(v){
      var card = document.createElement('div');
      card.className = 'variant-card';
      var thumbSrc = '/uploads/' + v.filename;
      card.innerHTML =
        '<div class="variant-thumb-wrap">' +
          '<img src="' + thumbSrc + '" alt="' + v.variant + '" class="variant-thumb" loading="lazy">' +
        '</div>' +
        '<div class="variant-info">' +
          '<div class="variant-label">' + (variantLabels[v.variant] || v.variant) + '</div>' +
          '<div class="variant-meta">' + v.width + ' &times; ' + v.height + 'px</div>' +
          '<div class="variant-size">' + formatSize(v.size) + '</div>' +
        '</div>';
      variantsContainer.appendChild(card);
    });
  }

  function openPanel(item){
    var src = item.dataset.src || '';
    var name = item.dataset.name || '';
    var size = item.dataset.size || '';
    var cat = item.dataset.category || 'general';
    var alt = item.dataset.alt || '';
    var id = item.dataset.id || '';
    var variants = [];
    try { variants = JSON.parse(item.dataset.variants || '[]'); } catch(e){}

    panelImg.src = src;
    panelName.textContent = name;
    panelSize.textContent = size;
    panelCategory.textContent = cat;
    panelAlt.value = alt;
    panelCatSelect.value = cat;
    panelFormAction.action = '/admin/media/' + id + '/update';
    panelDeleteForm.action = '/admin/media/' + id + '/delete';
    panelOpenLink.href = src;
    panelCopyBtn.dataset.url = src;

    renderVariants(variants);

    panel.classList.add('open');
    if(overlay) overlay.classList.add('open');
  }

  function closePanel(){
    panel.classList.remove('open');
    if(overlay) overlay.classList.remove('open');
  }

  document.querySelectorAll('.media-item[data-id]').forEach(function(item){
    item.addEventListener('click', function(e){
      if(e.target.closest('form') || e.target.closest('a') || e.target.tagName === 'BUTTON') return;
      openPanel(item);
    });
  });

  if(closeBtn) closeBtn.addEventListener('click', closePanel);
  if(overlay) overlay.addEventListener('click', closePanel);

  if(panelCopyBtn){
    panelCopyBtn.addEventListener('click', function(){
      var url = this.dataset.url;
      navigator.clipboard.writeText(window.location.origin + url).then(function(){
        panelCopyBtn.textContent = 'Copiato!';
        setTimeout(function(){ panelCopyBtn.textContent = 'Copia URL'; }, 1500);
      });
    });
  }
})();

/* ── IMAGE PICKER (choose from media or upload) ── */
(function(){
  document.querySelectorAll('[data-image-picker]').forEach(function(picker){
    var fileInput = picker.querySelector('input[type="file"]');
    var hiddenInput = picker.querySelector('input[type="hidden"]');
    var preview = picker.querySelector('.picker-preview');
    var chooseBtn = picker.querySelector('.picker-choose-btn');
    var modal = document.getElementById('imagePickerModal');
    var currentPicker = null;

    if(chooseBtn){
      chooseBtn.addEventListener('click', function(){
        currentPicker = picker;
        if(modal) modal.classList.add('open');
      });
    }

    // When a media item is selected from the modal
    if(modal){
      modal.querySelectorAll('.picker-media-item').forEach(function(item){
        item.addEventListener('click', function(){
          var filename = this.dataset.filename;
          var src = this.dataset.src;
          if(currentPicker){
            var h = currentPicker.querySelector('input[type="hidden"]');
            var p = currentPicker.querySelector('.picker-preview');
            if(h) h.value = filename;
            if(p){
              p.innerHTML = '<img src="' + src + '" alt=""><span class="picker-preview-name">' + filename + '</span>';
              p.style.display = 'flex';
            }
          }
          modal.classList.remove('open');
        });
      });

      var closeModal = modal.querySelector('.picker-modal-close');
      if(closeModal) closeModal.addEventListener('click', function(){
        modal.classList.remove('open');
      });
      modal.addEventListener('click', function(e){
        if(e.target === modal) modal.classList.remove('open');
      });
    }
  });
})();
