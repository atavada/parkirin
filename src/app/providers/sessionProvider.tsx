import { AuthProvider } from "../contexts/AuthContext";

interface Props {
	children?: React.ReactNode;
}

export default function AuthSessionProvider({ children }: Props) {
	return <AuthProvider>{children}</AuthProvider>;
}
