export function getAccessSecret(): string {
    const ACCESS_TOKEN_SECRET: string | undefined = process.env.ACCESS_TOKEN_SECRET;
    if (!ACCESS_TOKEN_SECRET || ACCESS_TOKEN_SECRET.length === 0) {
        throw new Error('The environment variable ACCESS_TOKEN_SECRET is not set.');
    }

    return ACCESS_TOKEN_SECRET;
}

export function getAdminAccessSecret(): string {
    const ADMIN_ACCESS_TOKEN_SECRET: string | undefined = process.env.ADMIN_ACCESS_TOKEN_SECRET;
    if (!ADMIN_ACCESS_TOKEN_SECRET || ADMIN_ACCESS_TOKEN_SECRET.length === 0) {
        throw new Error('The environment variable ACCESS_TOKEN_SECRET is not set.');
    }

    return ADMIN_ACCESS_TOKEN_SECRET;
}

export const emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
);

export const usernameRegex = new RegExp(/^[\w-]*$/); //eslint-disable-line
