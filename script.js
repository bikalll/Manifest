   const simpleQuotes = [
          "Sampada Nigga"
        ];
        const scene = document.getElementById('scene');
        const textOverlay = document.getElementById('textOverlay');
        const footer = document.getElementById('footer');

        function createStars() {
            const count = window.innerWidth < 600 ? 80 : 150;
            for (let i = 0; i < count; i++) {
                const s = document.createElement('div');
                s.className = 'star';
                const size = (Math.random() * 2 + 1) * (window.innerWidth<600?0.5:1);
                const top = Math.random() * 85;
                const left = Math.random() * 100;
                const dur = 2 + Math.random() * 5;
                s.style = `width:${size}px;height:${size}px;top:${top}%;left:${left}%;--duration:${dur}s;`;
                scene.appendChild(s);
            }
            const moon = document.createElement('div');
            moon.className = 'moon';
            const craterPositions = [
                { top: '15%', left: '20%', size: '10%' },
                { top: '45%', left: '60%', size: '8%' },
                { top: '60%', left: '30%', size: '6%' }
            ];
            craterPositions.forEach(pos => {
                const c = document.createElement('div');
                c.className = 'moon-crater';
                c.style = `width:${pos.size};height:${pos.size};top:${pos.top};left:${pos.left};`;
                moon.appendChild(c);
            });
            scene.appendChild(moon);
        }

        function showQuote() {
            const q = simpleQuotes[Math.floor(Math.random() * simpleQuotes.length)];
            textOverlay.innerHTML = q + '<div class="author">—</div>';
            textOverlay.classList.add('visible');
        }

        function createExplosion(x, y) {
            const count = window.innerWidth < 600 ? 8 : 12;
            for (let i = 0; i < count; i++) {
                const e = document.createElement('div');
                e.className = 'explosion';
                const size = (10 + Math.random() * 20) * (window.innerWidth<600?0.5:1);
                const colors = ['#bbdefb', '#90caf9', '#64b5f6', '#42a5f5'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                e.style = `position:absolute;left:${x - size/2}px;top:${y - size/2}px;width:${size}px;height:${size}px;border-radius:50%;background:radial-gradient(circle,#fff 0%,${color}30%,rgba(255,255,255,0)70%);box-shadow:0 0 ${size/2}px ${size/3}px ${color}`;
                scene.appendChild(e);
                const angle = Math.random() * 2 * Math.PI;
                const dist = (20 + Math.random() * 20) * (window.innerWidth<600?0.5:1);
                const endX = x + Math.cos(angle) * dist;
                const endY = y + Math.sin(angle) * dist;
                const dur = 600 + Math.random() * 400;
                e.animate([
                    { transform: 'scale(0)', opacity: 1 },
                    { transform: 'scale(1)', opacity: 0, left: `${endX - size/2}px`, top: `${endY - size/2}px` }
                ], { duration: dur, easing: 'ease-out' });
                setTimeout(() => e.remove(), dur);
            }
        }

        function animateGuidingLight() {
            const light = document.createElement('div');
            light.style = 'position:absolute;width:12px;height:12px;border-radius:50%;background:radial-gradient(circle,#fff,#64b5f6);box-shadow:0 0 15px rgba(100,181,246,0.7);';
            scene.appendChild(light);
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            light.style.left = startX + 'px';
            light.style.top = startY + 'px';
            setTimeout(() => {
                light.style.transition = 'all 1.8s ease-out';
                light.style.left = window.innerWidth/2 + 'px';
                light.style.top = window.innerHeight/2 + 'px';
                light.style.transform = `scale(${window.innerWidth<600?2:3})`;
            }, 100);
            setTimeout(() => {
                light.remove();
                createExplosion(window.innerWidth/2, window.innerHeight/2);
                showQuote();
                footer.classList.add('visible');
            }, 2000);
        }

        window.addEventListener('load', () => {
            createStars();
            animateGuidingLight();
        });
        window.addEventListener('resize', () => {
            scene.innerHTML = '<div class="mountains"></div>';
            createStars();
        });
