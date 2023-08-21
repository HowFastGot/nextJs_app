export declare type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);
export declare type RedirectableProviderType = 'email' | 'credentials';
export declare type OAuthProviderType =
	| '42'
	| 'apple'
	| 'atlassian'
	| 'auth0'
	| 'azure-ad-b2c'
	| 'azure-ad'
	| 'battlenet'
	| 'box'
	| 'bungie'
	| 'cognito'
	| 'coinbase'
	| 'credentials'
	| 'discord'
	| 'dropbox'
	| 'email'
	| 'eveonline'
	| 'facebook'
	| 'faceit'
	| 'foursquare'
	| 'freshbooks'
	| 'fusionauth'
	| 'github'
	| 'gitlab'
	| 'google'
	| 'identity-server4'
	| 'index'
	| 'instagram'
	| 'kakao'
	| 'keycloak'
	| 'line'
	| 'linkedin'
	| 'mailchimp'
	| 'mailru'
	| 'medium'
	| 'naver'
	| 'netlify'
	| 'oauth'
	| 'okta'
	| 'onelogin'
	| 'osso'
	| 'reddit'
	| 'salesforce'
	| 'slack'
	| 'spotify'
	| 'strava'
	| 'twitch'
	| 'twitter'
	| 'vk'
	| 'wordpress'
	| 'workos'
	| 'yandex'
	| 'zoho'
	| 'zoom';
export declare type BuiltInProviderType = RedirectableProviderType | OAuthProviderType;
export declare type ProviderType = 'oauth' | 'email' | 'credentials';
export interface ClientSafeProvider {
	id: LiteralUnion<BuiltInProviderType>;
	name: string;
	type: ProviderType;
	signinUrl: string;
	callbackUrl: string;
}

export declare type ProvidersStateListType = Record<
	LiteralUnion<BuiltInProviderType, string>,
	ClientSafeProvider
> | null;
