import "./Dot.scss";
interface DotProps {
    color: string;
}
const Dot = ({ color }: DotProps): JSX.Element => <div className="ui-dot" style={{ backgroundColor: color }}></div>;

export default Dot;
