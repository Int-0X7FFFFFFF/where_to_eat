// 按需替换为你的 JSON 路径
fetch('data.json')
    .then(res => res.json())
    .then(restaurants => {
        // 1. 准备 Winwheel 的 segments 数组
        const totalWeight = restaurants.reduce((sum, r) => sum + r.weight, 0);
        const segments = restaurants.map((r, i) => {
            // size: 权重 → 角度
            const size = (r.weight / totalWeight) * 360;
            return {
                fillStyle: `hsl(${i * (360 / restaurants.length)}, 70%, 60%)`,
                text: r.name,
                size
            };
        });

        // console.log(segments)

        // 2. 初始化 Winwheel
        const wheel = new Winwheel({
            canvasId: 'myWheel',
            outerRadius: 180,
            textFontSize: 16,
            numSegments: segments.length,
            segments,
            animation: {
                type: 'spinToStop',
                duration: 4,    // 秒
                spins: 5,       // 圈数
                callbackFinished: onFinished,
                yoyo: true,
            }
        });

        // 3. 按钮事件
        document.getElementById('spin-btn').addEventListener('click', () => {
            wheel.stopAnimation(false);
            // console.log(wheel)
            wheel.rotationAngle = wheel.rotationAngle % 360
            wheel.draw();
            // 重置结果区
            wheel.res
            document.getElementById('result-container').style.display = 'none';
            wheel.startAnimation();
        });

        // 4. 选中后的回调
        function onFinished(indicatedWheel) {
            document.getElementById('result-name').textContent = indicatedWheel.text;
            document.getElementById('result-container').style.display = 'block';
        }
    })
    .catch(err => console.error(err));
