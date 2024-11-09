import "./styles1.scss";

const divsCount = 300;
const arr = Array.from(Array(divsCount).keys());

/**
 *
 * @returns
 * @url https://codepen.io/natewiley/pen/GgONKy
 */
export const ParticlesBackground = () => {
  return (
    <div className="wrap">
      {arr.map((v) => (
        <div key={v} className="c"></div>
      ))}
    </div>
  );
};
