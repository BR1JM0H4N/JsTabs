(function() {
    var getRandomColor = function() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    var iframeWrapper = document.createElement('div');
    iframeWrapper.id = 'iframe-wrapper';
    iframeWrapper.style.position = 'fixed';
    iframeWrapper.style.top = '100px';
    iframeWrapper.style.left = '100px';
    iframeWrapper.style.width = '350px';
    iframeWrapper.style.height = '350px';
    iframeWrapper.style.zIndex = '1000';
    iframeWrapper.style.display = 'flex';
    iframeWrapper.style.flexDirection = 'column';
    iframeWrapper.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    iframeWrapper.style.borderRadius = '10px';
    iframeWrapper.style.overflow = 'hidden';
    iframeWrapper.style.transition = 'height 0.3s ease-in-out, width 0.3s ease-in-out';

    var dragHandle = document.createElement('div');
    dragHandle.id = 'drag-handle';
    dragHandle.style.width = '100%';
    dragHandle.style.backgroundColor = getRandomColor();
    dragHandle.style.cursor = 'move';
    dragHandle.style.padding = '5px';
    dragHandle.style.boxSizing = 'border-box';
    dragHandle.style.display = 'flex';
    dragHandle.style.justifyContent = 'flex-end';

    var collapseBtn = document.createElement('button');
    collapseBtn.id = 'collapse-btn';
    collapseBtn.innerHTML = '☰';
    collapseBtn.style.backgroundColor = 'transparent';
    collapseBtn.style.border = 'none';
    collapseBtn.style.color = 'white';
    collapseBtn.style.fontSize = '20px';
    collapseBtn.style.cursor = 'pointer';
    collapseBtn.style.webkitTapHighlightColor = 'transparent';

    var myIframe = document.createElement('iframe');
    myIframe.id = 'myIframe';
    myIframe.src = 'https://www.bing.com/search?q=hi';
    myIframe.style.width = '100%';
    myIframe.style.height = '100%';
    myIframe.style.border = 'none';
    myIframe.style.transition = 'opacity 0.3s ease-in-out';

    var isCollapsed = false;
    var isDragging = false;
    var initialMouseX, initialMouseY, initialTop, initialLeft;

    var toggleCollapse = function() {
        if (isCollapsed) {
            iframeWrapper.style.height = '350px';
            iframeWrapper.style.width = '350px';
            myIframe.style.opacity = '1';
            isCollapsed = false;
            collapseBtn.innerHTML = '☰';
        } else {
            iframeWrapper.style.height = '40px';
            iframeWrapper.style.width = '40px';
            myIframe.style.opacity = '0';
            isCollapsed = true;
            collapseBtn.innerHTML = '⛶';
        }
    };

    var onMouseMove = function(e) {
        if (isDragging) {
            var mouseX = (e.touches ? e.touches[0].clientX : e.clientX);
            var mouseY = (e.touches ? e.touches[0].clientY : e.clientY);
            var newTop = initialTop + (mouseY - initialMouseY);
            var newLeft = initialLeft + (mouseX - initialMouseX);

            newTop = Math.max(0, Math.min(window.innerHeight - iframeWrapper.offsetHeight, newTop));
            newLeft = Math.max(0, Math.min(window.innerWidth - iframeWrapper.offsetWidth, newLeft));

            iframeWrapper.style.top = newTop + 'px';
            iframeWrapper.style.left = newLeft + 'px';
        }
    };

    var onMouseDown = function(e) {
        isDragging = true;
        initialMouseX = (e.touches ? e.touches[0].clientX : e.clientX);
        initialMouseY = (e.touches ? e.touches[0].clientY : e.clientY);
        initialTop = parseInt(iframeWrapper.style.top, 10);
        initialLeft = parseInt(iframeWrapper.style.left, 10);

        window.addEventListener(e.touches ? 'touchmove' : 'mousemove', onMouseMove);
    };

    var onMouseUp = function(e) {
        isDragging = false;
        window.removeEventListener(e.touches ? 'touchmove' : 'mousemove', onMouseMove);
    };

    collapseBtn.addEventListener('click', toggleCollapse);
    dragHandle.addEventListener('mousedown', onMouseDown);
    dragHandle.addEventListener('touchstart', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);

    dragHandle.appendChild(collapseBtn);
    iframeWrapper.appendChild(dragHandle);
    iframeWrapper.appendChild(myIframe);
    document.body.appendChild(iframeWrapper);
})();
