import { h, c, Component } from "atomico";
import style from "./atomico-halo.css";

let StaticStyle = <style>{style}</style>;

interface Props {
    length:number;
    size:string;
    min:number;
    borderColor:string;
    borderWidth:number
}

const AtomicoHalo:Component<Props> = ({ length, size, min, borderColor, borderWidth }) => {
    min = 100 * (1 - min);
    return (
        <host
            style={{
                "--halo-border-color": borderColor,
                "--halo-border-width": borderWidth + "px",
            }}
        >
            {StaticStyle}
            <div aria class="halo" style={{ width: size, height: size }}>
                {[...Array(length)].map((_, i) => {
                    let size = 100 - min + (min / length) * (i + 1);
                    let opacity = (length - i) / length;
                    let strSize = size + "%";
                    return (
                        <div
                            style={{
                                "--theme-color": "red",
                                "--them-rot": 10,
                                opacity,
                                width: strSize,
                                height: strSize,
                            }}
                        ></div>
                    );
                })}
                <slot></slot>
            </div>
        </host>
    );
};

AtomicoHalo.props = {
    min: {
        type: Number,
        value: 0.2,
    },
    size: {
        type: String,
        value: "100vh",
    },
    length: {
        type: Number,
        value: 4,
    },
    borderColor: {
        type: String,
        value: "white",
    },
    borderWidth: {
        type: Number,
        value: 1,
    },
};

customElements.define("atomico-halo", c(AtomicoHalo));
