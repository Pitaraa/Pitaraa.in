window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-ZNQSCE0H7E');

(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xi8055e0b4");

document.addEventListener('DOMContentLoaded', function () {
  function trackEvent(name, params) {
    if (typeof gtag !== 'function') return;
    gtag('event', name, Object.assign({ event_category: 'engagement' }, params || {}));
  }

  function getNameFromElement(el) {
    if (!el) return '';
    if (el.hasAttribute('data-product-name')) return el.getAttribute('data-product-name');
    if (el.dataset && el.dataset.product) return el.dataset.product;
    var title = el.getAttribute('title');
    if (title) return title.replace(/^View\s+/i, '').trim();
    var nameEl = el.querySelector('.product-name, .mini-kit-name, h3');
    if (nameEl && nameEl.textContent) return nameEl.textContent.trim();
    var img = el.querySelector('img');
    if (img && img.alt) return img.alt.trim();
    return '';
  }

  function parseOpen360Name(onclick) {
    var match = onclick.match(/open360\(['"]([^'"]+)['"]/);
    return match ? match[1] : '';
  }

  function parseOpenLightboxName(onclick) {
    var match = onclick.match(/openLightbox\([^,]+,\s*['"]([^'"]+)['"]\)/);
    return match ? match[1] : '';
  }

  function sendOutboundClick(label, href) {
    trackEvent(label.toLowerCase() + '_click', {
      event_label: href || label,
      transport_type: 'beacon'
    });
  }

  function sendProductEvent(action, product) {
    if (!product) return;
    trackEvent(action, {
      event_label: product,
      item_name: product,
      transport_type: 'beacon'
    });
  }

  function trackProductListView() {
    var cards = document.querySelectorAll('.product-card');
    if (!cards.length) return;
    var names = Array.from(cards).map(getNameFromElement).filter(Boolean);
    if (!names.length) return;
    trackEvent('product_list_view', {
      event_label: 'Main product grid',
      items: names.join(', ')
    });
  }

  function trackOtherProductsPageView() {
    if (window.location.pathname.indexOf('OtherProducts.html') === -1) return;
    var cards = document.querySelectorAll('.grid .card');
    var names = Array.from(cards).map(getNameFromElement).filter(Boolean);
    trackEvent('other_products_page_view', {
      event_label: 'Other Products page',
      items: names.join(', ')
    });
  }

  document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach(function (anchor) {
    anchor.addEventListener('click', function () {
      sendOutboundClick('WhatsApp', anchor.href);
    });
  });

  document.querySelectorAll('a[href*="instagram.com"]').forEach(function (anchor) {
    anchor.addEventListener('click', function () {
      sendOutboundClick('Instagram', anchor.href);
    });
  });

  document.querySelectorAll('[onclick]').forEach(function (el) {
    var onclick = el.getAttribute('onclick') || '';
    if (onclick.indexOf('wa.me') !== -1 || onclick.indexOf('api.whatsapp.com') !== -1) {
      el.addEventListener('click', function () {
        sendOutboundClick('WhatsApp', onclick);
      });
    }
    if (onclick.indexOf('instagram.com') !== -1) {
      el.addEventListener('click', function () {
        sendOutboundClick('Instagram', onclick);
      });
    }
    if (onclick.indexOf('open360(') !== -1) {
      el.addEventListener('click', function () {
        var product = parseOpen360Name(onclick) || getNameFromElement(el);
        sendProductEvent('product_360_click', product);
      });
    }
    if (onclick.indexOf('openLightbox(') !== -1) {
      el.addEventListener('click', function () {
        var product = parseOpenLightboxName(onclick) || getNameFromElement(el);
        sendProductEvent('other_product_view', product);
      });
    }
  });

  document.querySelectorAll('.product-card').forEach(function (card) {
    card.addEventListener('click', function (event) {
      if (event.target.closest('.buy-btn')) return;
      if (event.target.closest('.product-img.clickable-360')) return;
      var product = getNameFromElement(card);
      sendProductEvent('product_click', product);
    });
  });

  document.querySelectorAll('.grid .card').forEach(function (card) {
    card.addEventListener('click', function () {
      var product = getNameFromElement(card);
      sendProductEvent('other_product_card_click', product);
    });
  });

  document.querySelectorAll('.buy-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var card = button.closest('.product-card');
      var product = getNameFromElement(card) || button.textContent;
      sendProductEvent('product_order_click', product);
    });
  });

  trackProductListView();
  trackOtherProductsPageView();
});
