import clsx from "clsx";
import "./styles2.scss";
import { PropsWithChildren } from "react";

interface ReactorLogoBackgroundProps {
  className?: string;
}

const liCount = 60;
const liElements = Array.from(Array(liCount).keys()).map((v) => (
  <li key={v}></li>
));

/**
 *
 * @returns
 * @url https://codepen.io/natewiley/pen/GgONKy
 */
export const ReactorLogoBackground = ({
  children,
  className,
}: PropsWithChildren<ReactorLogoBackgroundProps>) => {
  return (
    <div className={clsx(/*"absolute h-full w-full"*/ className)}>
      <div className="arc_reactor">
        <div className="case_container">
          <div className="e7">
            <div className="semi_arc_3 e5_1">
              <div className="semi_arc_3 e5_2">
                <div className="semi_arc_3 e5_3">
                  <div className="semi_arc_3 e5_4"></div>
                </div>
              </div>
            </div>
            <div className="core2">{children}</div>
          </div>
          <ul className="marks">{liElements}</ul>
        </div>
      </div>
    </div>
  );
};
