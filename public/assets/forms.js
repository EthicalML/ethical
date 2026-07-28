(function () {
  document.querySelectorAll('[data-institute-form]').forEach(function (form) {
    var startedAt = Date.now();
    var startedAtInput = form.querySelector('[name="startedAt"]');
    var message = form.querySelector('[data-form-confirmation]');
    var button = form.querySelector('[type="submit"]');
    var applicationInterest = form.querySelector('[data-application-interest]');
    var applicationHelper = form.querySelector('[data-application-helper]');
    startedAtInput.value = String(startedAt);
    if (applicationInterest && applicationHelper) {
      var updateApplicationHelper = function () {
        applicationHelper.hidden = !applicationInterest.checked;
      };
      applicationInterest.addEventListener('change', updateApplicationHelper);
      updateApplicationHelper();
    }

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var endpoint = form.dataset.endpoint.trim();
      var clientKey = localStorage.getItem('ethical-form-client') || crypto.randomUUID();
      localStorage.setItem('ethical-form-client', clientKey);
      var payload = {
        name: data.get('name'),
        email: data.get('email'),
        organisation: data.get('organisation'),
        furtherInformation: data.get('furtherInformation'),
        interests: data.getAll('interests'),
        website: data.get('website'),
        startedAt: Number(data.get('startedAt')),
        elapsedMs: Date.now() - startedAt,
        minimumSubmissionMs: Number(form.dataset.minimumSubmissionMs),
        clientKey: clientKey,
        page: location.pathname,
        variant: form.dataset.variant,
      };

      button.disabled = true;
      message.hidden = true;
      form.dataset.state = 'submitting';

      try {
        if (endpoint) {
          await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload),
          });
        }
        form.dataset.state = 'success';
        message.textContent = endpoint ? form.dataset.confirmation : form.dataset.demoConfirmation;
        message.hidden = false;
      } catch (error) {
        form.dataset.state = 'error';
        message.textContent = form.dataset.error;
        message.hidden = false;
      } finally {
        button.disabled = false;
      }
    });
  });
})();
