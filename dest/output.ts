export interface RootInterface {
    username: string;
    level: number;
    games: Games_Interface;
    wins: string;
    lost: number;
    played: string;
    playtime: Playtime_Interface;
    quick: string;
    competitive: Competitive_Interface;
    avatar: string;
    rank: string;
    rank_img: string;
    levelFrame: string;
    star: string;
}
export interface Games_Interface {
    quick: GamesQuick_Interface;
    competitive: GamesCompetitive_Interface;
}
export interface GamesQuick_Interface {
    wins: string;
    lost: number;
    played: string;
}
export interface GamesCompetitive_Interface {
    wins: string;
    lost: number;
    played: string;
}
export interface Playtime_Interface {
    quick: string;
    competitive: string;
}
export interface Competitive_Interface {
    rank: string;
    rank_img: string;
}
