export const vertex = `
    attribute vec3 tex;
    
    varying vec3 texOut;
    
    void main ( void ) {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
        texOut = tex;
    }
`;

export const frag = `
precision highp float;

vec2 mBBS( vec2 val, float modulus ) {
    val = mod( val, modulus ); // For numerical consistancy.
    return mod(val * val, modulus);
}

uniform sampler2D nzw;
const float modulus = 61.0;  // Value used in pregenerated noise texture.

float mnoise ( vec3 pos ) {
    float intArg = floor( pos.z );
    float fracArg = fract( pos.z );
    vec2 hash = mBBS( intArg * 3.0 + vec2( 0, 3 ), modulus );
    vec4 g = vec4 (
    texture2D( nzw, vec2( pos.x, pos.y + hash.x ) / modulus ).xy,
    texture2D( nzw, vec2( pos.x, pos.y + hash.y ) / modulus ).xy
    ) * 2.0 - 1.0;
    return mix(
    g.x + g.y * fracArg,
    g.z + g.w * ( fracArg - 1.0 ),
    smoothstep( 0.0, 1.0, fracArg )
);
}

const int octives = 4;
const float lacunarity = 2.0;
const float gain = 0.5;

float turbulence( vec3 pos ) {
    float sum  = 0.0;
    float freq = 1.0;
    float amp  = 1.0;
    for ( int i = 0; i < 4; i++ ) {
        sum += abs( mnoise( pos * freq ) ) * amp;
        freq *= lacunarity;
        amp *= gain;
    }
    return sum;
}

const float magnatude = 1.3;
uniform float time;
uniform sampler2D fireProfile;

vec4 sampleFire( vec3 loc, vec4 scale ) {
    loc.xz = loc.xz * 2.0 - 1.0;
    vec2 st = vec2( sqrt( dot( loc.xz, loc.xz ) ), loc.y );
    loc.y -= time * scale.w; // Scrolling noise upwards over time.
    loc *= scale.xyz; // Scaling noise space.
    float offset = sqrt( st.y ) * magnatude * turbulence( loc );
    st.y += offset;
    if ( st.y > 1.0 ) {
        return vec4( 0, 0, 0, 1 );
    }
    vec4 result = texture2D( fireProfile, st );
    if ( st.y < 0.1 ) {
        result *= st.y / 0.1;
    }
    return result;
}

varying vec3 texOut;

void main( void ) {
    vec3 color = sampleFire( texOut, vec4( 1.0, 2.0, 1.0, 0.5 ) ).xyz;
    gl_FragColor = vec4( color * 1.5, 1 );
}
`;
