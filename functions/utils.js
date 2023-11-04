//  -- WORLD TO SCREEN --

function worldToScreen(coords){
    return new Vec2(coords.x - camera.x + 1920/2, coords.y - camera.y + 1080/2);
}

function worldToScreenX(x){
    return x - camera.x + 1920/2;
}

function worldToScreenY(y){
    return y - camera.y + 1080/2;
}

//  -- SCREEN TO WORLD --

function worldToScreen(coords){
    return new Vec2(camera.x + coords.x - 1920/2, camera.y + coords.y - 1080/2);
}

function screenToWorldX(x){
    return camera.x + x - 1920/2;
}

function screenToWorldY(y){
    return camera.y + y - 1080/2;
}