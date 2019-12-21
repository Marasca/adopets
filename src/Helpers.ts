export function uppercaseWords(string: string) {
    const regex = /(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g;

    return string.toLowerCase().replace(regex, s => s.toUpperCase())
}

export function isEmptyObject(obj: object) {
    return Object.keys(obj).length === 0;
}

export const petSexes = {
    MALE: "Male",
    FEMALE: "Female"
};

export const petSizes = {
    XS: "Extra Small",
    S: "Small",
    M: "Medium",
    L: "Large",
    XL: "Extra Large"
};

export const petAges = {
    BABY: "Baby",
    YOUNG: "Young",
    ADULT: "Adult",
    SENIOR: "Senior"
};
