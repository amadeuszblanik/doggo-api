const JWT_MILLISECONDS_TO_MULTIPLY = 1000;

const jwtDateUtils = (jwtTimestamp: number): Date => new Date(jwtTimestamp * JWT_MILLISECONDS_TO_MULTIPLY);

export default jwtDateUtils;
