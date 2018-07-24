export { Bitmap   } from './core/Bitmap';
export { Camera   } from './game/Camera';
export { Game     } from './game/Game';
export { Object2D } from './core/Object2D';
export { Scene    } from './game/Scene';
export { Vector2  } from './math/Vector2';

let col1 = (opacity) => { return `rgba( 48, 232, 191, ${opacity})`; };
let col2 = (opacity) => { return `rgba(255, 130,  53, ${opacity})`; };
let version = 'VERSION';

if(typeof window !== 'undefined') {
    /* eslint-disable-next-line */
    console.log(
        `%c .· Minim2D v${version} ·. `,
        `background: linear-gradient(to right, ${col1(0)} 0%, ${col1(1)} 10%, ${col2(1)} 90%, ${col2(0)} 100%); color: #fff; font-weight: bold`
    );
}
