import { Header } from "./Header";
import "./page.css";

interface PageProps {
    user?: {};
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}

export const Page = ({ user, onLogin, onLogout, onCreateAccount }: PageProps) => (
    <article>
        <Header user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />

        <section>
            <h2>Pages in Storybook</h2>
        </section>
    </article>
);
