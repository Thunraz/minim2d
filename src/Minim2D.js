export { Bitmap       } from './core/Bitmap.js';
export { Camera       } from './game/Camera.js';
export { Game         } from './game/Game.js';
export { Object2D     } from './core/Object2D.js';
export { Recorder     } from './helper/Recorder.js';
export { Scene        } from './game/Scene.js';
export { SoundManager } from './helper/SoundManager.js';
export { Vector2      } from './math/Vector2.js';

const col1 = (opacity) => `rgba( 48, 232, 191, ${opacity})`;
const col2 = (opacity) => `rgba(255, 130,  53, ${opacity})`;
const version = '__VERSION__';

if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log(
        `%c .· Minim2D v${version} ·. `,
        `background: linear-gradient(to right, ${col1(0)} 0%, ${col1(1)} 10%, ${col2(1)} 90%, ${col2(0)} 100%); color: #fff; font-weight: bold`,
    );
}
