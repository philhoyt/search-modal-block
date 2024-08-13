import MicroModal from 'micromodal';

document.addEventListener('DOMContentLoaded', () => {
    MicroModal.init({
        openTrigger: 'data-micromodal-trigger',
        closeTrigger: 'data-micromodal-close',
        disableScroll: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true,
    });
});
