class PathNode {
    /* Parent is the parent k:y coordinate
     * Coordinate is the current x:y coordinate
     * maxX is the right hand barrier
     * maxY is the bottom barrier (positve goes down)
     * path is a map of where you have been
     * used is a set of where you have been
     * finalPosition is the x:y coordinate of where you are going
     * 0:0 is the initial, 0:maxY is the 
    */
    constructor (parent, coordinate, maxY, maxX, path, used, finalPosition) {
        this.parent = parent;
        this.coordinate = coordinate;
        this.maxY = maxY;
        this.maxX = maxX;
        this.path = path;
        this.used = used;
        this.finalPosition = finalPosition;
        let [stringCurrentX, stringCurrentY] = this.coordinate.split(':');
        let [stringParentX, stringParentY] = this.parent.split(':');
        this.parentX = parseInt(stringParentX);
        this.parentY = parseInt(stringParentY);
        this.currentX = parseInt(stringCurrentX);
        this.currentY = parseInt(stringCurrentY);
        this.up = 

    }
}