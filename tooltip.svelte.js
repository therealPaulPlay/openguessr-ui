import { computePosition, flip, shift, offset, arrow, autoUpdate } from "@floating-ui/dom";

export function tooltip({ text, imageSrc, imageAspectRatio = "1 / 1", state, onClose, maxWidth = imageSrc ? 150 : 300, zIndex, showDelay = 0, mobile = true }) {
    return (node) => {
        let tooltipElement, arrowElement, textElement, imageElement, closeElement;
        let visible = false;
        let cleanupAutoUpdate;
        let showTimeout = null;

        const persistent = Boolean(state);
        const closedScale = imageSrc ? 0.85 : 0;
        const animationDuration = imageSrc ? 250 : 150;

        function createTooltip() {
            tooltipElement = document.createElement('div');
            if (!persistent) tooltipElement.setAttribute('popover', 'manual');
            tooltipElement.setAttribute('role', 'tooltip');
            tooltipElement.className = imageSrc ? 'tooltip tooltip-with-image' : 'tooltip';
            if (persistent) tooltipElement.style.position = 'absolute';

            arrowElement = document.createElement('div');
            arrowElement.className = 'tooltip-arrow';
            tooltipElement.appendChild(arrowElement);

            if (persistent && imageSrc) appendCloseButton();

            if (imageSrc) appendImage();

            textElement = document.createElement('p');
            textElement.textContent = text;
            textElement.className = 'tooltip-text';
            tooltipElement.appendChild(textElement);

            Object.assign(tooltipElement.style, {
                transform: `scale(${closedScale})`,
                opacity: '0%',
                filter: 'blur(var(--elevated-blur))',
                transition: `transform ${animationDuration}ms ease, opacity ${animationDuration}ms ease, filter ${animationDuration}ms ease`,
                maxWidth: `${maxWidth}px`
            });
            if (zIndex !== undefined) tooltipElement.style.zIndex = zIndex;

            document.body.appendChild(tooltipElement);
        }

        function appendImage() {
            imageElement = document.createElement('img');
            imageElement.src = imageSrc;
            imageElement.alt = 'Info graphic';
            imageElement.className = 'tooltip-image';
            imageElement.style.aspectRatio = imageAspectRatio;
            tooltipElement.appendChild(imageElement);
        }

        function appendCloseButton() {
            closeElement = document.createElement('button');
            closeElement.className = 'tooltip-close';
            closeElement.setAttribute('aria-label', 'Close');
            closeElement.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            closeElement.addEventListener('click', () => {
                state.visible = false;
                try {
                    onClose?.();
                } catch (error) {
                    console.error("Error occured in tooltip close callback:", error);
                }
            });
            tooltipElement.appendChild(closeElement);
        }

        async function position() {
            const boxMargin = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--box-margin'));
            return computePosition(node, tooltipElement, {
                placement: "top",
                middleware: [offset(18), flip(), shift({ padding: boxMargin }), arrow({ element: arrowElement, padding: 4 })]
            }).then(({ x, y, placement, middlewareData }) => {
                Object.assign(tooltipElement.style, { left: `${x}px`, top: `${y}px` });

                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const side = placement.split('-')[0];

                Object.assign(arrowElement.style, { left: '', top: '', right: '', bottom: '' });

                if (side === 'top') Object.assign(arrowElement.style, { left: `${arrowX}px`, bottom: '-6px' });
                else if (side === 'bottom') Object.assign(arrowElement.style, { left: `${arrowX}px`, top: '-6px' });
                else if (side === 'left') Object.assign(arrowElement.style, { top: `${arrowY}px`, right: '-6px' });
                else if (side === 'right') Object.assign(arrowElement.style, { top: `${arrowY}px`, left: '-6px' });

                arrowElement.setAttribute('data-placement', side);
            });
        }

        function scheduleShow() {
            if (visible || showTimeout) return;
            if (showDelay > 0) {
                showTimeout = setTimeout(() => {
                    showTimeout = null;
                    show();
                }, showDelay);
            } else show();
        }

        function show() {
            if (!mobile && window.matchMedia("(max-width: 800px)").matches) return;
            if (!tooltipElement) createTooltip();

            visible = true;
            if (persistent) tooltipElement.style.display = '';
            else tooltipElement.showPopover();

            position().then(() => {
                requestAnimationFrame(() => {
                    Object.assign(tooltipElement.style, {
                        transform: 'scale(1)',
                        opacity: '100%',
                        filter: 'blur(0)'
                    });
                });
            });

            // Track layout changes while open
            cleanupAutoUpdate = autoUpdate(node, tooltipElement, position);
        }

        function hide() {
            // Cancel any pending show
            if (showTimeout) {
                clearTimeout(showTimeout);
                showTimeout = null;
            }
            if (!tooltipElement || !visible) return;

            visible = false;
            Object.assign(tooltipElement.style, {
                transform: `scale(${closedScale})`,
                opacity: '0%',
                filter: 'blur(var(--elevated-blur))'
            });

            cleanupAutoUpdate?.();
            cleanupAutoUpdate = null;

            setTimeout(() => {
                if (visible || !tooltipElement) return;
                if (persistent) tooltipElement.style.display = 'none';
                else tooltipElement.hidePopover();
            }, animationDuration);
        }

        function onPointerEnter(e) {
            if (e.pointerType == "touch") return;
            scheduleShow();
        }

        function onPointerLeave(e) {
            if (e.pointerType == "touch") return;
            hide();
        }

        if (persistent) {
            $effect(() => {
                if (state.visible) scheduleShow();
                else hide();
            });
        } else {
            node.addEventListener('pointerenter', onPointerEnter);
            node.addEventListener('pointerleave', onPointerLeave);
        }

        return () => {
            if (!persistent) {
                node.removeEventListener('pointerenter', onPointerEnter);
                node.removeEventListener('pointerleave', onPointerLeave);
            }
            if (showTimeout) clearTimeout(showTimeout);
            cleanupAutoUpdate?.();
            tooltipElement?.remove();
        };
    }
}
