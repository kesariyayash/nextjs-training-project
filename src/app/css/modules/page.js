import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
    title: "CSS Playground",
};

export default function CSSPlayground() {
    return (
        <div className={styles.container}>
            <div >
                <h1 className={styles.header}>CSS Playground <i class="fa-solid fa-heart"></i></h1>
            </div>

            <div className="p-3 text-center space-y-5">
                <p className="text-lg text-white p-2 bg-indigo-500 rounded-md font-semibold mt-3">CSS modules is integrated by making a file page.module.css in the route that you want it integrated.</p>
                <p className="text-lg text-white p-2 bg-indigo-500 rounded-md font-semibold">Tailwind CSS is integrated by importing it into the global.css file and setting plugins in postcss.config.mjs, imports globally.</p>
                <p className="text-lg text-white p-2 bg-indigo-500 rounded-md font-semibold">Font Awesome is integrated by installing the package and importing it in the layout.js file, imports globally.</p>
            </div>
            <p className="text-sm text-indigo-500 bg-white border-black mt-5 px-2 rounded-lg">stlyed using <b>tailwind css</b> and <b>module css</b></p>

            <div className="mt-5 flex flex-col justify-center items-center">
                <Link className="text-white font-semibold hover:underline hover:text-indigo-500 opacity-90" href="/">Home Page </Link>
                <span className="text-sm opacity-70">takes you back to the index page</span>
            </div>


        </div>
    );
}
