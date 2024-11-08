import "./styles.scss";

const divsCount = 300;
const arr = Array.from(Array(divsCount).keys());

export const ParticlesBackground = () => {
  return (
    <div className="wrap">
      {arr.map((v) => (
        <div key={v} className="c"></div>
      ))}
    </div>
  );
};
