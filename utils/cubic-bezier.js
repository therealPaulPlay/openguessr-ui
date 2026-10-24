export function cubicBezier(x1, y1, x2, y2) {
    const curve = (s, c1, c2) => (1 - 3 * c2 + 3 * c1) * s ** 3 + (3 * c2 - 6 * c1) * s ** 2 + 3 * c1 * s;
    return (t) => {
        let s = t;
        for (let i = 0; i < 5; i++) {
            const slope = 3 * (1 - 3 * x2 + 3 * x1) * s ** 2 + 2 * (3 * x2 - 6 * x1) * s + 3 * x1;
            if (Math.abs(slope) < 1e-6) break;
            s -= (curve(s, x1, x2) - t) / slope;
        }
        return curve(s, y1, y2);
    };
}