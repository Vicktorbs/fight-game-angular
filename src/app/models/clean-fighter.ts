export interface CleanFighter {
    id:         number;
    name:       string;
    powerstats: Powerstats;
    images:     Images;
}

export interface Images {
    xs: string;
    sm: string;
    md: string;
    lg: string;
}

export interface Powerstats {
    intelligence: number;
    strength:     number;
    speed:        number;
    durability:   number;
    power:        number;
    combat:       number;
}
