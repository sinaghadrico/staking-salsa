import { FC } from "react";
import { Header } from "components/header";
import { Footer } from "components/footer";
// import { Sidebar } from "components/sidebar";
import "./Layout.scss";
import { LayoutProps } from "./Layout.interface";

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => (
    <div className="layout">
        <div className="layout-main">
            <Header />
            {/* <Sidebar /> */}
            <div className="layout-main-content">
                <div className="row">
                    <div className="col-md-12">{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
);

Layout.defaultProps = {};
export default Layout;
