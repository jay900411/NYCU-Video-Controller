let osdElement = null;
let osdTimeout = null;

/**
 * 於畫面上建立並顯示 OSD (On-Screen Display) 提示
 * @param {string} text - 要顯示的文字
 * @param {HTMLElement} container - 要掛載的目標容器
 */
function showOSD(text, container) {
    if (!osdElement) {
        osdElement = document.createElement('div'); 
        osdElement.style.position = 'absolute';
        osdElement.style.top = '50%';
        osdElement.style.left = '50%';
        osdElement.style.transform = 'translate(-50%, -50%)'; 
        osdElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; 
        osdElement.style.color = 'white'; 
        osdElement.style.padding = '15px 25px'; 
        osdElement.style.fontSize = '24px';
        osdElement.style.borderRadius = '8px'; 
        osdElement.style.zIndex = '9999'; 
        osdElement.style.pointerEvents = 'none'; 
        osdElement.style.transition = 'opacity 0.2s'; 
        osdElement.style.opacity = '0'; 
        
        container.appendChild(osdElement);
    }

    osdElement.innerText = text;
    osdElement.style.opacity = '1';

    if (osdTimeout) {
        clearTimeout(osdTimeout);
    }
    
    osdTimeout = setTimeout(() => {
        osdElement.style.opacity = '0';
    }, 500);
}

document.addEventListener('keydown', function(event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }

    const video = document.querySelector('video');
    if (!video) return; 

    const container = video.closest('.plyr') || video.parentElement;
    const validSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4];
    
    // 檢查是否為目標快捷鍵，若是則攔截事件，避免與原生播放器衝突
    const isTargetKey = ['Space', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'KeyF', 'Period', 'Comma'].includes(event.code);
    if (isTargetKey) {
        event.stopPropagation();
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }

    switch(event.code) {
        case 'Space':
            event.preventDefault(); 
            if (video.paused) {
                video.play();
                showOSD("▶\uFE0E 播放", container);
            } else {
                video.pause();
                showOSD("⏸\uFE0E 暫停", container);
            }
            break;
            
        case 'ArrowRight':
            event.preventDefault();
            video.currentTime += 10; 
            showOSD("前進 10 秒", container);
            break;
            
        case 'ArrowLeft':
            event.preventDefault();
            video.currentTime -= 10; 
            showOSD("後退 10 秒", container);
            break;

        case 'ArrowUp':
            event.preventDefault();
            video.volume = Math.min(video.volume + 0.1, 1.0); 
            showOSD(`音量: ${Math.round(video.volume * 100)}%`, container);
            break;
            
        case 'ArrowDown':
            event.preventDefault();
            video.volume = Math.max(video.volume - 0.1, 0.0); 
            showOSD(`音量: ${Math.round(video.volume * 100)}%`, container);
            break;

        case 'KeyF':
            event.preventDefault();
            if (!document.fullscreenElement) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
            break;

        case 'Period': // Shift + >
            if (event.shiftKey) {
                event.preventDefault();
                const currentRate = video.playbackRate;
                const nextSpeed = validSpeeds.find(speed => speed > currentRate + 0.01);
                
                if (nextSpeed) {
                    video.playbackRate = nextSpeed;
                    showOSD(`速度: ${nextSpeed}x`, container);
                } else {
                    showOSD(`速度: ${currentRate}x (MAX)`, container);
                }
            }
            break;

        case 'Comma': // Shift + <
            if (event.shiftKey) {
                event.preventDefault();
                const currentRate = video.playbackRate;
                const prevSpeed = [...validSpeeds].reverse().find(speed => speed < currentRate - 0.01);
                
                if (prevSpeed) {
                    video.playbackRate = prevSpeed;
                    showOSD(`速度: ${prevSpeed}x`, container);
                } else {
                    showOSD(`速度: ${currentRate}x (MIN)`, container);
                }
            }
            break;
    }
}, true);