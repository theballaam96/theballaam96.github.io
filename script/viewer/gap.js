/**
 * Gap Detector Script (yUpGapDetector.js)
 *
 * This script identifies gaps between wall and floor triangles.
 *
 * IMPORTANT: Y-axis is treated as the vertical (up/down) axis.
 * Vectors are: [x, y, z]. Y is index 1.
 */

// --- Data Structures ---

/**
 * @typedef {number[]} Vector3 - An array [x, y, z].
 */

/**
 * @typedef {Vector3[]} Triangle - An array of three Vector3 arrays.
 */

// --- Core Geometric Helper Functions (Adapted for Y-Up) ---

// Constants for array indexing
const X = 0;
const Y = 1; // Y is now the UP axis
const Z = 2; // Z is now a horizontal axis

/**
 * Calculates the cross product of two vectors (v1 x v2).
 * @param {Vector3} v1 - The first vector [x, y, z].
 * @param {Vector3} v2 - The second vector [x, y, z].
 * @returns {Vector3} The resulting vector [x, y, z].
 */
function crossProduct(v1, v2) {
    return [
        v1[Y] * v2[Z] - v1[Z] * v2[Y], // New X
        v1[Z] * v2[X] - v1[X] * v2[Z], // New Y (Vertical)
        v1[X] * v2[Y] - v1[Y] * v2[X]  // New Z
    ];
}

/**
 * Calculates the vector from p1 to p2 (p2 - p1).
 * @param {Vector3} p1 - The starting point [x, y, z].
 * @param {Vector3} p2 - The ending point [x, y, z].
 * @returns {Vector3} The resulting vector [x, y, z].
 */
function subtractVectors(p1, p2) {
    return [
        p2[X] - p1[X],
        p2[Y] - p1[Y],
        p2[Z] - p1[Z]
    ];
}

/**
 * Calculates the normal vector of a triangle.
 * @param {Triangle} triangle - The triangle.
 * @returns {Vector3} The un-normalized normal vector [x, y, z].
 */
function calculateTriangleNormal(triangle) {
    // Edge 1: v2 -> v1
    const edge1 = subtractVectors(triangle[1], triangle[2]);
    // Edge 2: v0 -> v1
    const edge2 = subtractVectors(triangle[1], triangle[0]);
    return crossProduct(edge1, edge2);
}

/**
 * Checks if a floor triangle's normal indicates it's a floor (not a ceiling).
 * Assumes the world 'up' axis is positive Y.
 * @param {Vector3} normal - The normal vector [x, y, z].
 * @returns {boolean} True if the triangle is oriented as a floor.
 */
function isFloor(normal) {
    // A floor normal should point generally UP (positive Y)
    const Y_THRESHOLD = 0.5;
    return normal[Y] > Y_THRESHOLD; // CHECK IS NOW ON Y-INDEX (1)
}

/**
 * Calculates the squared distance between two points.
 * @param {Vector3} p1 - First point [x, y, z].
 * @param {Vector3} p2 - Second point [x, y, z].
 * @returns {number} The squared distance.
 */
function distanceSq(p1, p2) {
    const dx = p1[X] - p2[X];
    const dy = p1[Y] - p2[Y];
    const dz = p1[Z] - p2[Z];
    return dx * dx + dy * dy + dz * dz;
}

// --- Main Detection Logic ---

/**
 * Simplified check for misalignment, using average Y and a basic XZ proximity check.
 * @param {Vector3} vA - First vertex of the wall edge.
 * @param {Vector3} vB - Second vertex of the wall edge.
 * @param {Triangle} floorTri - The floor triangle to check against.
 * @param {number} tolerance - The maximum allowed gap distance.
 * @returns {boolean} True if a misalignment gap is detected.
 */
function checkProximityAndIntersection(vA, vB, floorTri, tolerance) {
    const edgeMidpointY = (vA[Y] + vB[Y]) / 2; // USE Y-INDEX
    const floorAvgY = (floorTri[0][Y] + floorTri[1][Y] + floorTri[2][Y]) / 3; // USE Y-INDEX

    // 1. Y-Proximity Check: The edge must be vertically close to the floor plane
    const yProximity = Math.abs(edgeMidpointY - floorAvgY);
    if (yProximity > tolerance * 1.5) {
        return false;
    }

    // 2. XZ Proximity Check (Horizontal): Check distance to the floor area.
    // We compare points projected onto the XZ plane (Y=0).
    const horizontalDistSq = distanceSq(
        [vA[X], 0, vA[Z]], // Project vA onto XZ plane
        [floorTri[0][X], 0, floorTri[0][Z]] // Project floor point onto XZ plane
    );

    if (horizontalDistSq > 25) { // Arbitrary proximity check threshold
        return false;
    }

    return true;
}

function lineIntersectsTriangle(p1, p2, tri, epsilon = 1e-6) {
  const [v0, v1, v2] = tri;

  // Compute triangle normal
  const edge1 = subtract(v1, v0);
  const edge2 = subtract(v2, v0);
  const normal = cross(edge1, edge2);

  const dir = subtract(p2, p1);
  const denom = dot(normal, dir);
  if (Math.abs(denom) < epsilon) return null; // Parallel

  const t = dot(subtract(v0, p1), normal) / denom;
  if (t < 0 || t > 1) return null; // Intersection not within segment

  const intersection = add(p1, scale(dir, t));

  // Barycentric test to see if point is inside triangle
  const inside = pointInTriangle(intersection, v0, v1, v2, normal);
  return inside ? intersection : null;
}

// --- Helpers ---
function subtract(a, b) { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
function add(a, b) { return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]; }
function scale(v, s) { return [v[0]*s, v[1]*s, v[2]*s]; }
function dot(a, b) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; }
function cross(a, b) {
  return [
    a[1]*b[2] - a[2]*b[1],
    a[2]*b[0] - a[0]*b[2],
    a[0]*b[1] - a[1]*b[0]
  ];
}

// --- Barycentric coordinate check ---
function pointInTriangle(p, a, b, c, normal) {
  const u = subtract(b, a);
  const v = subtract(c, a);
  const w = subtract(p, a);

  const uu = dot(u, u);
  const uv = dot(u, v);
  const vv = dot(v, v);
  const wu = dot(w, u);
  const wv = dot(w, v);

  const denom = uv * uv - uu * vv;
  if (Math.abs(denom) < 1e-6) return false;

  const s = (uv * wv - vv * wu) / denom;
  const t = (uv * wu - uu * wv) / denom;
  return (s >= 0) && (t >= 0) && (s + t <= 1);
}

function vecLengthSq(v) {
    return dot(v, v);
}
function vecNormalize(v) {
    const len = Math.sqrt(vecLengthSq(v));
    return len > 1e-12 ? [v[0]/len, v[1]/len, v[2]/len] : [0,0,0];
}

// --- Project a triangle onto an axis ---
function projectTriangle(tri, axis) {
    const dots = tri.map(v => dot(v, axis));
    return [Math.min(...dots), Math.max(...dots)];
}

// --- Main intersection test ---
function trianglesIntersect(triA, triB) {
    // Edges
    const edgesA = [
        subtract(triA[1], triA[0]),
        subtract(triA[2], triA[1]),
        subtract(triA[0], triA[2])
    ];
    const edgesB = [
        subtract(triB[1], triB[0]),
        subtract(triB[2], triB[1]),
        subtract(triB[0], triB[2])
    ];

    // Normals
    const normalA = vecNormalize(cross(edgesA[0], edgesA[1]));
    const normalB = vecNormalize(cross(edgesB[0], edgesB[1]));

    // Quick plane-side tests
    const projA = triB.map(v => dot(normalA, subtract(v, triA[0])));
    if (projA.every(d => d > 0) || projA.every(d => d < 0)) return false;

    const projB = triA.map(v => dot(normalB, subtract(v, triB[0])));
    if (projB.every(d => d > 0) || projB.every(d => d < 0)) return false;

    // Build potential separating axes
    const axes = [];
    axes.push(normalA, normalB);

    for (let ea of edgesA) {
        for (let eb of edgesB) {
            const axis = cross(ea, eb);
            if (vecLengthSq(axis) > 1e-12) axes.push(vecNormalize(axis));
        }
    }

    // SAT test on all axes
    for (let axis of axes) {
        const [minA, maxA] = projectTriangle(triA, axis);
        const [minB, maxB] = projectTriangle(triB, axis);
        if (maxA < minB || maxB < minA) return false; // separated
    }

    return true; // No separating axis found => intersection
}

function bisectTriangleWithVerticalLine(triangle, line) {
    const [p1, p2] = line;
    const [A, B, C] = triangle;

    // Plane normal (Y-axis cross line direction projected on XZ)
    const dir = [
        p2[0] - p1[0], // dx
        p2[1] - p1[1], // dy (not used)
        p2[2] - p1[2]  // dz
    ];

    // This plane passes through the Y-axis and the line’s XZ direction
    // Plane normal is perpendicular to the line’s XZ projection
    const n = [dir[2], 0, -dir[0]]; // Cross of (0,1,0) × dir

    // Plane constant
    const d = -(n[0]*p1[0] + n[2]*p1[2]);

    function planeSide(v) {
        // Positive or negative depending on side of plane
        return n[0]*v[0] + n[2]*v[2] + d;
    }

    function intersectEdge(v1, v2, s1, s2) {
        const t = s1 / (s1 - s2);
        return [
            v1[0] + (v2[0] - v1[0]) * t,
            v1[1] + (v2[1] - v1[1]) * t,
            v1[2] + (v2[2] - v1[2]) * t
        ];
    }

    const sides = [planeSide(A), planeSide(B), planeSide(C)];

    const pos = [], neg = [], inters = [];

    const verts = [A, B, C];
    for (let i = 0; i < 3; i++) {
        const v1 = verts[i];
        const v2 = verts[(i + 1) % 3];
        const s1 = sides[i];
        const s2 = sides[(i + 1) % 3];

        if (s1 >= 0) pos.push(v1); else neg.push(v1);

        if (s1 * s2 < 0) {
            const I = intersectEdge(v1, v2, s1, s2);
            inters.push(I);
            pos.push(I);
            neg.push(I);
        }
    }

    // If less than two intersections, triangle not bisected
    if (inters.length < 2) return null;

    return [pos, neg];
}

// Overlap checker
function projectXZ(tri) {
    return tri.map(v => [v[0], v[2]]);
}

// Shoelace formula for a polygon
function polygonArea(poly) {
    let area = 0;
    for (let i = 0; i < poly.length; i++) {
        const [x1, y1] = poly[i];
        const [x2, y2] = poly[(i + 1) % poly.length];
        area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area) / 2;
}

// Compute triangle area
function triangleArea(tri) {
    return polygonArea(tri);
}

// Check if point P is inside triangle ABC using barycentric coordinates
function pointInTriangle(P, A, B, C) {
    const [x, y] = P;
    const [x1, y1] = A;
    const [x2, y2] = B;
    const [x3, y3] = C;

    const denom = (y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3);
    const a = ((y2 - y3)*(x - x3) + (x3 - x2)*(y - y3)) / denom;
    const b = ((y3 - y1)*(x - x3) + (x1 - x3)*(y - y3)) / denom;
    const c = 1 - a - b;
    return a >= 0 && b >= 0 && c >= 0;
}

// Line intersection: returns [x,y] or null
function segmentIntersection(A,B,C,D) {
    const [x1,y1]=A, [x2,y2]=B, [x3,y3]=C, [x4,y4]=D;
    const denom = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
    if (Math.abs(denom) < 1e-12) return null; // parallel
    const px = ((x1*y2 - y1*x2)*(x3-x4) - (x1-x2)*(x3*y4 - y3*x4)) / denom;
    const py = ((x1*y2 - y1*x2)*(y3-y4) - (y1-y2)*(x3*y4 - y3*x4)) / denom;
    // Check if within both segments
    if ((px < Math.min(x1,x2)-1e-9 || px > Math.max(x1,x2)+1e-9) ||
        (px < Math.min(x3,x4)-1e-9 || px > Math.max(x3,x4)+1e-9)) return null;
    if ((py < Math.min(y1,y2)-1e-9 || py > Math.max(y1,y2)+1e-9) ||
        (py < Math.min(y3,y4)-1e-9 || py > Math.max(y3,y4)+1e-9)) return null;
    return [px, py];
}

// Compute intersection polygon of two triangles (convex polygons)
function triangleIntersection(tri1, tri2) {
    const points = [];

    // vertices of tri1 inside tri2
    for (const v of tri1) if (pointInTriangle(v, ...tri2)) points.push(v);
    // vertices of tri2 inside tri1
    for (const v of tri2) if (pointInTriangle(v, ...tri1)) points.push(v);

    // edge intersections
    for (let i=0;i<3;i++) {
        const A=tri1[i], B=tri1[(i+1)%3];
        for (let j=0;j<3;j++) {
            const C=tri2[j], D=tri2[(j+1)%3];
            const I = segmentIntersection(A,B,C,D);
            if (I) points.push(I);
        }
    }

    if (points.length === 0) return [];

    // Convex hull of points to form intersection polygon
    return convexHull(points);
}

// Graham scan for convex hull (2D)
function convexHull(points) {
    if (points.length <= 3) return points.slice();
    // sort by x,y
    points = points.slice().sort((a,b)=>a[0]-b[0] || a[1]-b[1]);
    const cross = (o,a,b) => (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0]);
    const lower = [];
    for (const p of points) {
        while(lower.length>=2 && cross(lower[lower.length-2],lower[lower.length-1],p)<=0) lower.pop();
        lower.push(p);
    }
    const upper = [];
    for (let i=points.length-1;i>=0;i--) {
        const p = points[i];
        while(upper.length>=2 && cross(upper[upper.length-2],upper[upper.length-1],p)<=0) upper.pop();
        upper.push(p);
    }
    lower.pop(); upper.pop();
    return lower.concat(upper);
}

// Compute union area of two triangles
function unionArea(tri1, tri2) {
    const area1 = triangleArea(tri1);
    const area2 = triangleArea(tri2);
    const interPoly = triangleIntersection(tri1, tri2);
    const interArea = interPoly.length>0 ? polygonArea(interPoly) : 0;
    return area1 + area2 - interArea;
}

// --- Main function ---

function triangleUnionWithMostArea(f, t1, t2) {
    const f2D = projectXZ(f);
    const t12D = projectXZ(t1);
    const t22D = projectXZ(t2);

    const area1 = unionArea(f2D, t12D);
    const area2 = unionArea(f2D, t22D);

    return area1 > area2 ? 0 : (area2 > area1 ? 1 : null);
}

/**
 * Determines gaps between wall and floor triangles based on misalignment criteria.
 * @param {Triangle[]} floorTriangles - List of floor triangles.
 * @param {Triangle[]} wallTriangles - List of wall triangles.
 * @param {number} gapTolerance - The maximum distance considered a 'gap'.
 * @returns {Triangle[]} A list of triangles representing the identified gaps.
 */
function findMisalignmentGaps(floorTriangles, wallTriangles, gapTolerance = 0.05) {
    const gapTests = [];

    // 1. Pre-process and filter floor triangles
    const validFloorData = floorTriangles.filter(data => isFloor(calculateTriangleNormal(data)));

    // Filter out those where all 3 edges are adjoined to another floor tri or wall tri
    validFloorData.forEach((floor, index) => {
        window.regenProcess = parseInt((index / validFloorData.length) * 990) / 10;
        let edges = [
            {
                start: [floor[0][0], floor[0][1], floor[0][2]],
                end: [floor[1][0], floor[1][1], floor[1][2]],
                nearest_wall_edge: null,
                nearest_wall_edge_index: null,
                nearest_wall_tri: null,
                wall_edge_score: 1000000,
                this_tri: index,
            },
            {
                start: [floor[1][0], floor[1][1], floor[1][2]],
                end: [floor[2][0], floor[2][1], floor[2][2]],
                nearest_wall_edge: null,
                nearest_wall_edge_index: null,
                nearest_wall_tri: null,
                wall_edge_score: 1000000,
                this_tri: index,
            },
            {
                start: [floor[2][0], floor[2][1], floor[2][2]],
                end: [floor[0][0], floor[0][1], floor[0][2]],
                nearest_wall_edge: null,
                nearest_wall_edge_index: null,
                nearest_wall_tri: null,
                wall_edge_score: 1000000,
                this_tri: index,
            }
        ]
        const stringified_verts = floor.map(k => JSON.stringify(k));
        // Check other floors
        validFloorData.forEach((f, i) => {
            if (i == index) {
                return;
            }
            let same_triangle = true;
            const test_stringified_verts = f.map(k => JSON.stringify(k));
            test_stringified_verts.forEach(vert => {
                if (!stringified_verts.includes(vert)) {
                    same_triangle = false;
                }
            })
            if (same_triangle) {
                return;
            }
            let test_edges = [
                {
                    start: [f[0][0], f[0][1], f[0][2]],
                    end: [f[1][0], f[1][1], f[1][2]],
                },
                {
                    start: [f[1][0], f[1][1], f[1][2]],
                    end: [f[2][0], f[2][1], f[2][2]],
                },
                {
                    start: [f[2][0], f[2][1], f[2][2]],
                    end: [f[0][0], f[0][1], f[0][2]],
                }
            ]
            test_edges.forEach(e => {
                edges.filter(edge => !edge.matched).forEach(edge => {
                    if (e.start[0] == edge.start[0] && e.start[1] == edge.start[1] && e.start[2] == edge.start[2]) {
                        if (e.end[0] == edge.end[0] && e.end[1] == edge.end[1] && e.end[2] == edge.end[2]) {
                            edge.matched = true;
                        }
                    } else if (e.start[0] == edge.end[0] && e.start[1] == edge.end[1] && e.start[2] == edge.end[2])  {
                        if (e.end[0] == edge.start[0] && e.end[1] == edge.start[1] && e.end[2] == edge.start[2]) {
                            edge.matched = true;
                        }
                    }
                })
            })
            if (edges.filter(e => !e.matched).length == 0) {
                return;
            }
        })
        // Early exit if all are matched
        if (edges.filter(e => !e.matched).length == 0) {
            return;
        }
        // Check walls
        wallTriangles.forEach(w => {
            let test_edges = [
                {
                    start: [w[0][0], w[0][1], w[0][2]],
                    end: [w[1][0], w[1][1], w[1][2]],
                },
                {
                    start: [w[1][0], w[1][1], w[1][2]],
                    end: [w[2][0], w[2][1], w[2][2]],
                },
                {
                    start: [w[2][0], w[2][1], w[2][2]],
                    end: [w[0][0], w[0][1], w[0][2]],
                }
            ]
            // Matching edges
            test_edges.forEach(e => {
                edges.filter(edge => !edge.matched).forEach(edge => {
                    if (e.start[0] == edge.start[0] && e.start[1] == edge.start[1] && e.start[2] == edge.start[2]) {
                        if (e.end[0] == edge.end[0] && e.end[1] == edge.end[1] && e.end[2] == edge.end[2]) {
                            edge.matched = true;
                        }
                    } else if (e.start[0] == edge.end[0] && e.start[1] == edge.end[1] && e.start[2] == edge.end[2])  {
                        if (e.end[0] == edge.start[0] && e.end[1] == edge.start[1] && e.end[2] == edge.start[2]) {
                            edge.matched = true;
                        }
                    }
                })
            })
            if (edges.filter(e => !e.matched).length == 0) {
                return;
            }
            // For each remaining edge, get the nearest wall edge
            test_edges.forEach((e, ei) => {
                edges.filter(edge => !edge.matched).forEach(edge => {
                    let delta_x0 = e.start[0] - edge.start[0];
                    let delta_y0 = e.start[1] - edge.start[1];
                    let delta_z0 = e.start[2] - edge.start[2];
                    let delta_x1 = e.end[0] - edge.end[0];
                    let delta_y1 = e.end[1] - edge.end[1];
                    let delta_z1 = e.end[2] - edge.end[2];
                    let test_score = Math.sqrt((delta_x0 * delta_x0) + (delta_y0 * delta_y0) + (delta_z0 * delta_z0)) + Math.sqrt((delta_x1 * delta_x1) + (delta_y1 * delta_y1) + (delta_z1 * delta_z1));
                    delta_x0 = e.start[0] - edge.end[0];
                    delta_y0 = e.start[1] - edge.end[1];
                    delta_z0 = e.start[2] - edge.end[2];
                    delta_x1 = e.end[0] - edge.start[0];
                    delta_y1 = e.end[1] - edge.start[1];
                    delta_z1 = e.end[2] - edge.start[2];
                    let test_score0 = Math.sqrt((delta_x0 * delta_x0) + (delta_y0 * delta_y0) + (delta_z0 * delta_z0)) + Math.sqrt((delta_x1 * delta_x1) + (delta_y1 * delta_y1) + (delta_z1 * delta_z1));
                    let flip_edges = test_score0 < test_score;
                    let best_score = Math.min(test_score, test_score0);
                    if (best_score < edge.wall_edge_score) {
                        edge.wall_edge_score = best_score;
                        if (flip_edges) {
                            start = e.start;
                            end = e.end;
                            edge.nearest_wall_edge = {
                                start: e.end,
                                end: e.start,
                            }
                        } else {
                            edge.nearest_wall_edge = e;
                        }
                        edge.nearest_wall_edge_index = ei;
                        edge.nearest_wall_tri = w;
                    }
                })
            });
        })
        if (edges.filter(e => !e.matched).length == 0) {
            return;
        }
        // Check if the edge line intersects with the nearest wall
        edges.filter(e => !e.matched).forEach(edge => {
            const hit = lineIntersectsTriangle(edge.start, edge.end, edge.nearest_wall_tri);
            const bisected_tri = bisectTriangleWithVerticalLine(edge.nearest_wall_tri, [edge.start, edge.end]);
            if (!hit) {
                // Line doesn't intersect with triangle, so test if the wall intersects the floor triangle
                const tri_intersect = trianglesIntersect(floor, edge.nearest_wall_tri);
                if (tri_intersect) {
                    // If it does, then mark the edge as matched (therefore not eligible for a ledge clip)
                    // since the nearest wall is either blocking the ledge or under the floor
                    edge.matched = true;
                } else {
                    // If it does not, then it's a potential candidate for a ledge clip because the wall is entirely past the triangle
                    gapTests.push([
                        edge.start,
                        edge.nearest_wall_edge.start,
                        edge.end,
                    ]);
                    gapTests.push([
                        edge.nearest_wall_edge.start,
                        edge.nearest_wall_edge.end,
                        edge.end,
                    ]);
                }
            } else if (bisected_tri) {
                // Line does intersect with triangle, so there's at least some portion of the floor which has an exposed part
                // which is potentially eligible for a ledge clip

                // Likely solution to this is to bisect the wall, then for each half of the wall tri, check if it intersects the floor tri
                // If it does intersect the floor tri, then that portion is not eligible for a ledge clip because it's cutting off part of the floor edge.
                // If it doesn't intersect the floor tri, then that portion is potentially a ledge clip spot
                bisected_tri.forEach((poly, poly_index) => {
                    if (poly.length == 3) {
                        // All good, this is a tri
                        return;
                    }
                    // Likely a quad, form a triangle from the highest 3 vertices
                    const sorted = poly.slice().sort((a, b) => b[1] - a[1]);
                    bisected_tri[poly_index] = sorted.slice(0, 3);
                })
                const test_tris = [];
                bisected_tri.forEach(subtri => {
                    const sorted_verts = subtri.slice().sort((a, b) => b[1] - a[1]);
                    const v0 = sorted_verts[0];
                    let v1 = sorted_verts[1];
                    /*
                    let v1_score = null;
                    [sorted_verts[1], sorted_verts[2]].forEach(sv => {
                        const dx = v0[0] - sv[0];
                        const dy = v0[1] - sv[1];
                        const dz = v0[2] - sv[2];
                        const dist = (dx * dx) + (dy * dy) + (dz * dz);
                        if (dist > v1_score || v1_score == null) {
                            v1_score = dist;
                            v1 = sv;
                        }
                    });
                    */
                    let v2 = edge.start;
                    let dx0 = v0[0] - edge.start[0];
                    let dy0 = v0[1] - edge.start[1];
                    let dz0 = v0[2] - edge.start[2];
                    let dx1 = v1[0] - edge.start[0];
                    let dy1 = v1[1] - edge.start[1];
                    let dz1 = v1[2] - edge.start[2];
                    let score1 = Math.sqrt((dx0 * dx0) + (dy0 * dy0) + (dz0 * dz0)) + Math.sqrt((dx1 * dx1) + (dy1 * dy1) + (dz1 * dz1));
                    dx0 = v0[0] - edge.end[0];
                    dy0 = v0[1] - edge.end[1];
                    dz0 = v0[2] - edge.end[2];
                    dx1 = v1[0] - edge.end[0];
                    dy1 = v1[1] - edge.end[1];
                    dz1 = v1[2] - edge.end[2];
                    let score2 = Math.sqrt((dx0 * dx0) + (dy0 * dy0) + (dz0 * dz0)) + Math.sqrt((dx1 * dx1) + (dy1 * dy1) + (dz1 * dz1));
                    if (score2 < score1) {
                        v2 = edge.end;
                    }
                    test_tris.push([v0, v1, v2]);
                })
                const best_tri = triangleUnionWithMostArea(floor, test_tris[0], test_tris[1]);
                if (best_tri !== null) {
                    const tri_to_keep = test_tris[best_tri];
                    gapTests.push(tri_to_keep);
                }
            }
            // After this logic, we should probably start composing the tris of potential ledge clip areas.
            // Then after we do this, we need to check if there is floor underneath
            // If there is floor underneath then, at least with current logic, it should be a ledge clip spot
            // If there's no floor underneath, then there's no way to lower your height therefore it can't be ledge clipped.
        })
    });
    const gaps = gapTests.filter(tri => {
        let edges = [
            {
                verts: [tri[0], tri[1]],
                length: null,
                dy: null,
            },
            {
                verts: [tri[1], tri[2]],
                length: null,
                dy: null,
            },
            {
                verts: [tri[2], tri[0]],
                length: null,
                dy: null,
            },
        ]
        edges.forEach(edge => {
            const dx = edge.verts[0][0] - edge.verts[1][0];
            const dy = edge.verts[0][1] - edge.verts[1][1];
            const dz = edge.verts[0][2] - edge.verts[1][2];
            edge.length = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
            edge.dy = dy;
        })
        const shortest_length = Math.min(edges[0].length, edges[1].length, edges[2].length);
        if (shortest_length > 10) {
            // Probably a false positive
            return false;
        }
        return true;
    })
    
    const output = gaps;
    return output;
}

const WALL_TOLERANCE = 0.05; // 5 cm gap tolerance

function dumpGapTris(tris) {
    const floorTriangles = tris.filter(k => k.is_floor && !k.is_void && !k.is_nonsolid && !k.is_damage && !k.is_instadeath && !k.is_water).map(k => k.coords);
    const wallTriangles = tris.filter(k => k.is_wall).map(k => k.coords);
    if (floorTriangles.length == 0 || wallTriangles.length == 0) {
        return [];
    }
    const gapsFound = findMisalignmentGaps(floorTriangles, wallTriangles, WALL_TOLERANCE);

    console.log('--- Array-based Gap Detector Results ---');
    console.log(`Tolerance used: ${WALL_TOLERANCE}`);
    console.log(`Total valid floor pieces processed: ${floorTriangles.length - 1} (one ceiling ignored)`);
    console.log(`Found ${gapsFound.length} gap triangles.`);
    return gapsFound.map(k => {
        return {
            coords: k,
            is_gap: true
        }
    })
}
window.dumpGapTris = dumpGapTris;