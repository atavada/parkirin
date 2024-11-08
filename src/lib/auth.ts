export const getToken = (): string | null => {
	return typeof window !== "undefined" ? localStorage.getItem("token") : null;
};

export const setToken = (token: string): void => {
	if (typeof window !== "undefined") {
		localStorage.setItem("token", token);
	}
};

export const removeToken = (): void => {
	if (typeof window !== "undefined") {
		localStorage.removeItem("token");
	}
};
