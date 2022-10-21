/* 
 * MIT License
 * 
 * Copyright (c) 2020 Nolonar
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//=============================================================================
// Metadata
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Adds a minimap to the game.
 * @author Nolonar
 * @url https://github.com/Nolonar/RM_Plugins
 * 
 * @param isHiddenDuringEvents
 * @text Hide during events
 * @desc Whether to hide the minimap when an event is running (excluding Parallel events).
 * @type boolean
 * @default true
 * 
 * @param switch
 * @text Switch
 * @desc The switch with which to turn the minimap on or off. If no switch is chosen, minimap will be always on.
 * @type switch
 * @default 0
 * 
 * @param opacity
 * @text Minimap opacity
 * @desc The opacity of the map. The lower the value, the more transparent the minimap.
 * @type number
 * @min 0
 * @max 255
 * @default 128
 * 
 * @param Position
 * @desc Where to position the minimap on screen.
 * 
 * @param posVertical
 * @parent Position
 * @text Vertical
 * @type select
 * @option top
 * @option middle
 * @option bottom
 * @default top
 * 
 * @param posHorizontal
 * @parent Position
 * @text Horizontal
 * @type select
 * @option left
 * @option middle
 * @option right
 * @default left
 * 
 * @param maxWidthPercent
 * @text Max width %
 * @desc The maximum width in % the minimap will take on screen.
 * @type number
 * @min 1
 * @max 100
 * @default 25
 * 
 * @param maxHeightPercent
 * @text Max height %
 * @desc The maximum height in % the minimap will take on screen.
 * @type number
 * @min 1
 * @max 100
 * @default 50
 * 
 * @param Colors
 * 
 * @param waterColor
 * @parent Colors
 * @text Water color
 * @desc The color of boat-passable water on the minimap. Supports CSS colors.
 * @type string
 * @default rgba(0, 100, 255, .5)
 * 
 * @param deepWaterColor
 * @parent Colors
 * @text Deep water color
 * @desc The color of ship-passable deep water on the minimap. Supports CSS colors.
 * @type string
 * @default rgba(0, 50, 200, .5)
 * 
 * @param damageColor
 * @parent Colors
 * @text Damage floor color
 * @desc The color of hazardous tiles on the minimap. Supports CSS colors.
 * @type string
 * @default rgb(200, 100, 0)
 * 
 * @param bushColor
 * @parent Colors
 * @text Bush color
 * @desc The color of bush tiles on the minimap. Supports CSS colors.
 * @type string
 * @default rgb(0, 100, 0)
 * 
 * @param passableColor
 * @parent Colors
 * @text Passable color
 * @desc The color of passable tiles on the minimap. Supports CSS colors.
 * @type string
 * @default rgb(0, 200, 0)
 * 
 * @param impassableColor
 * @parent Colors
 * @text Impassable color
 * @desc The color of impassable tiles on the minimap. Supports CSS colors.
 * @type string
 * @default rgb(100, 100, 100)
 * 
 * @param playerColor
 * @parent Colors
 * @text Player color
 * @desc The color of the dot that represents the player on the minimap. Supports CSS colors.
 * @type string
 * @default rgb(255, 0, 0)
 * 
 * 
 * @command show
 * @text Show minimap
 * @desc Shows minimap until event finishes.
 * 
 * @command hide
 * @text Hide minimap
 * @desc Hides minimap until event finishes.
 * 
 * 
 * @command track
 * @text Add marker
 * @desc Adds a custom marker to the minimap.
 * 
 * @arg map
 * @text Map ID
 * @desc The map on which the minimap should add the marker. If 0, the current map will be chosen.
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg target
 * @text Target
 * @desc The target of the marker. Refer to the help section for more info about valid targets.
 * @type string
 * @default 0, 0
 * 
 * @arg color
 * @text Color
 * @desc The color of the marker. Supports CSS colors.
 * @type string
 * @default rgb(255, 255, 0)
 * 
 * @command untrack
 * @text Remove marker
 * @desc Removes a custom marker from the minimap.
 * 
 * @arg map
 * @text Map ID
 * @desc The map on which the minimap should add the marker. If 0, the current map will be chosen.
 * @type number
 * @min 0
 * @default 0
 * 
 * @arg target
 * @text Target
 * @desc The target of the marker. Must be the same as when adding the marker.
 * @type string
 * @default 0, 0
 * 
 * 
 * @help Version 1.0.2
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * Show minimap
 *      Shows the minimap until the event is over.
 * 
 * Hide minimap
 *      Hides the minimap until the event is over.
 * 
 * Add marker
 *      Adds a custom marker to the minimap.
 * 
 * Remove marker
 *      Removes a custom marker from the minimap.
 * 
 * Both "Add marker" and "Remove marker" require a target. There are
 * multiple ways to define a valid target:
 *      23, 50
 *          This refers to a static marker at coordinates (23, 50). Coordinates
 *          can be 0, but not negative.
 * 
 *      42
 *          This refers to a static marker at coordinates (42, 42).
 * 
 *      v1, v2
 *          This refers to a static marker at positions defined in variables 1
 *          and 2. This can be mixed with the above, example:
 *              v4, 10
 *              5, v3
 *              v9
 *          Where 10 and 5 are static values (they don't change), while v4, v3,
 *          and v9 are values defined in variables 4, 3, and 9.
 * 
 *      e13
 *          This refers to a marker that points to event 13.
 * 
 *      e0
 *          This refers to a marker that points to the current event.
 * 
 *      ev6
 *          This refers to a marker that points to the event whose ID is
 *          defined in variable 6.
 * 
 * The target for "Remove marker" must exactly match the one for "Add marker".
 * Example: If the target for "Add marker" was "v7, v8", then the target for
 * "Remove marker" must also be "v7, v8", and not "13, 14", even if variables
 * 7 and 8 currently hold the values 13 and 14. Whitespaces and
 * uppercase/lowercase are ignored, so "1, 2" and "1,2" are identical, as are
 * "v8" and "V8".
 * 
 * 
 * ============================================================================
 * Notetags
 * ============================================================================
 * 
 * Map Notetag:
 * <minimap on>
 *      The minimap is always on for this map, unless temporarily turned off by
 *      plugin command.
 * 
 * <minimap off>
 *      The minimap is always off for this map, unless temporarily turned on by
 *      plugin command.
 */

(() => {
    //=========================================================================
    // Constants
    //=========================================================================
    const PLUGIN_NAME = "N_Minimap";

    const OPTION_POS_LEFT = "left"
    const OPTION_POS_MIDDLE = "middle"
    const OPTION_POS_RIGHT = "right"
    const OPTION_POS_TOP = "top"
    const OPTION_POS_BOTTOM = "bottom"

    const COMMAND_SHOW = "show";
    const COMMAND_HIDE = "hide";
    const COMMAND_TRACK = "track";
    const COMMAND_UNTRACK = "untrack";

    const NOTETAG_MINIMAP_ON = "minimap on";
    const NOTETAG_MINIMAP_OFF = "minimap off";

    const SAVE_KEY_MARKERS = "minimap_markers";

    const NOTETAG_VISIBILITY_MAP = {
        [NOTETAG_MINIMAP_ON]: true,
        [NOTETAG_MINIMAP_OFF]: false
    };

    let parameters = PluginManager.parameters(PLUGIN_NAME);
    parameters.isHiddenDuringEvents = parameters.isHiddenDuringEvents !== "false";
    parameters.switch = Number(parameters.switch) || 0;
    parameters.opacity = Number(parameters.opacity) || 128;
    parameters.posVertical = parameters.posVertical || OPTION_POS_TOP;
    parameters.posHorizontal = parameters.posHorizontal || OPTION_POS_LEFT;
    parameters.maxWidthPercent = Number(parameters.maxWidthPercent) || 25;
    parameters.maxHeightPercent = Number(parameters.maxHeightPercent) || 50;
    parameters.waterColor = parameters.waterColor || "rgba(0, 100, 255, .5)";
    parameters.deepWaterColor = parameters.deepWaterColor || "rgba(0, 50, 200, .5)";
    parameters.damageColor = parameters.damageColor || "rgb(200, 100, 0)";
    parameters.bushColor = parameters.bushColor || "rgb(0, 100, 0)";
    parameters.passableColor = parameters.passableColor || "rgb(0, 200, 0)";
    parameters.impassableColor = parameters.impassableColor || "rgb(100, 100, 100)";
    parameters.playerColor = parameters.playerColor || "rgb(255, 0, 0)";

    PluginManager.registerCommand(PLUGIN_NAME, COMMAND_SHOW, () => {
        minimap.show();
    });
    PluginManager.registerCommand(PLUGIN_NAME, COMMAND_HIDE, () => {
        minimap.hide();
    });
    PluginManager.registerCommand(PLUGIN_NAME, COMMAND_TRACK, function (args) {
        addMarker(sanitizeMarkerArgs.call(this, args));
    });
    PluginManager.registerCommand(PLUGIN_NAME, COMMAND_UNTRACK, function (args) {
        removeMarker(sanitizeMarkerArgs.call(this, args));
    });

    function sanitizeMarkerArgs(args) {
        return {
            map: Number(args.map) || this._mapId,
            target: sanitizeMarkerTarget(args.target || "0, 0"),
            color: args.color || "rgb(255, 255, 0)"
        }
    }

    function sanitizeMarkerTarget(target) {
        return target.replace(/\s/g, "").toLowerCase();
    }

    let minimap = null;
    class Window_Minimap extends Window_Base {
        initialize() {
            super.initialize(this.getRect());
            this.backOpacity = 255;
            this.opacity = this.contentsOpacity = 0;
        }

        update() {
            super.update();
            if (!this.mapTexture) {
                // Texture is missing, try updating it.
                this.updateMapTexture();
                return;
            }

            this.visible = this.isVisible();
            if (!this.visible)
                return;

            this.contents.clear();
            this.drawMap();
            this.drawMarkers();
            this.drawPlayerPosition();
        }

        isVisible() {
            if (SceneManager._scene !== Scene_Map)
                return false;

            if (parameters.isHiddenDuringEvents && $gameMap.isEventRunning())
                return false;

            const notetag = Object.keys(NOTETAG_VISIBILITY_MAP).find(k => k in $dataMap.meta);
            if (notetag)
                return NOTETAG_VISIBILITY_MAP[notetag]

            return !parameters.switch || $gameSwitches.value(parameters.switch);
        }

        updateTone() {
            this.setTone(0, 0, 0);
        }

        updateMapTexture() {
            if (!$dataMap)
                return; // Can't create minimap texture without $dataMap.

            // Using setTimeout to run code asynchronously (non-blocking).
            // Even with async, slow code seems to be blocking the UI.
            setTimeout(() => {
                this.mapTexture?.destroy();
                this.mapTexture = this.createMapTexture();
                this.opacity = this.contentsOpacity = parameters.opacity;
            }, 0);
        }

        createMapTexture() {
            const mapWidth = $gameMap.width();
            const mapHeight = $gameMap.height();
            const tileWidth = $gameMap.tileWidth();
            const tileHeight = $gameMap.tileHeight();
            const texture = new Bitmap(mapWidth * tileWidth, mapHeight * tileHeight);
            for (let x = 0; x < mapWidth; x++) {
                for (let y = 0; y < mapHeight; y++) {
                    this.drawTile(texture, x, y, tileWidth, tileHeight);
                }
            }
            return texture;
        }

        drawTile(texture, x, y, width, height) {
            const px = x * width;
            const py = y * height;
            const tileColor = this.getTileColor(x, y);
            texture.fillRect(px, py, width, height, tileColor || parameters.passableColor);
            if (tileColor)
                return;

            const impassableRects = [
                new Rectangle(px, py + 3 * height / 4, width, height / 4), // Down
                new Rectangle(px, py, width / 4, height), // Left
                new Rectangle(px + 3 * width / 4, py, width / 4, height), // Right
                new Rectangle(px, py, width, height / 4) // Up
            ].filter((_, d) => !$gameMap.checkPassage(x, y, 1 << d));

            if (impassableRects.length === 4) {
                texture.fillRect(px, py, width, height, parameters.impassableColor);
                return;
            }

            for (const r of impassableRects)
                texture.fillRect(r.x, r.y, r.width, r.height, parameters.impassableColor);
        }

        getTileColor(x, y) {
            if ($gameMap.isBoatPassable(x, y)) return parameters.waterColor;
            if ($gameMap.isShipPassable(x, y)) return parameters.deepWaterColor;
            if ($gameMap.isDamageFloor(x, y)) return parameters.damageColor;
            if ($gameMap.isBush(x, y)) return parameters.bushColor;

            return null;
        }

        drawMap() {
            const sourceWidth = this.mapTexture.width;
            const sourceHeight = this.mapTexture.height;
            const destWidth = this.contentsWidth();
            const destHeight = this.contentsHeight();
            this.contents.blt(this.mapTexture, 0, 0, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);
        }

        drawPlayerPosition() {
            const playerPos = this.getPositionOnMinimap($gamePlayer);
            this.contents.drawCircle(playerPos.x, playerPos.y, 2, parameters.playerColor);
        }

        drawMarkers() {
            const currentMarkers = markers[$gameMap.mapId()];
            if (!currentMarkers) return;

            for (const target in currentMarkers) {
                const pos = this.getPositionOnMinimap(this.getMarkerTarget(target));
                const color = currentMarkers[target];
                this.contents.drawCircle(pos.x, pos.y, 2, color);
            }
        }

        getMarkerTarget(target) {
            const split = target.split(",");
            return this.getMarkerEvent(split[0]) ?? this.getMarkerPosition(...split);
        }

        getMarkerEvent(key) {
            return key.charAt(0) === "e"
                ? $gameMap._events[this.getMarkerVariableValue(key.slice(1))]
                : null;
        }

        getMarkerVariableValue(key) {
            if (!key) return null;

            return key.charAt(0) === "v"
                ? $gameVariables.value(key.slice(1))
                : Number(key);
        }

        getMarkerPosition(x, y) {
            const rx = this.getMarkerVariableValue(x);
            return {
                _realX: rx,
                _realY: this.getMarkerVariableValue(y) ?? rx
            };
        }

        getRect() {
            const size = this.getSize();
            const pos_x = {
                [OPTION_POS_LEFT]: 0,
                [OPTION_POS_MIDDLE]: (Graphics.width - size.width) / 2,
                [OPTION_POS_RIGHT]: Graphics.width - size.width
            }
            const pos_y = {
                [OPTION_POS_TOP]: 0,
                [OPTION_POS_MIDDLE]: (Graphics.height - size.height) / 2,
                [OPTION_POS_BOTTOM]: Graphics.height - size.height
            }
            const pos = {
                x: pos_x[parameters.posHorizontal],
                y: pos_y[parameters.posVertical]
            };

            return new Rectangle(pos.x, pos.y, size.width, size.height);
        }

        getPositionOnMinimap(character) {
            const tileWidth = this.contentsWidth() / $gameMap.width();
            const tileHeight = this.contentsHeight() / $gameMap.height();
            return {
                x: character._realX * tileWidth + tileWidth / 2,
                y: character._realY * tileHeight + tileHeight / 2
            };
        }

        getSize() {
            const max_size = {
                width: Graphics.width * parameters.maxWidthPercent / 100,
                height: Graphics.height * parameters.maxHeightPercent / 100
            };
            const mapWidth = $gameMap.width();
            const mapHeight = $gameMap.height();

            const scale_x = max_size.width / mapWidth;
            const scale_y = max_size.height / mapHeight;
            const scale = Math.min(scale_x, scale_y);

            return {
                width: Math.floor(mapWidth * scale),
                height: Math.floor(mapHeight * scale)
            };
        }
    }

    let markers = {};
    function addMarker(args) {
        const map = args.map;
        if (!markers[map]) markers[map] = {};

        markers[map][args.target] = args.color;
    }

    function removeMarker(args) {
        const map = args.map;
        if (!markers[map]) return;

        delete markers[map][args.target];
    }

    //=========================================================================
    // Scene_Map
    //=========================================================================
    const Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        Scene_Map_onMapLoaded.call(this);

        minimap = new Window_Minimap();
        this.addChild(minimap);
    };

    //=========================================================================
    // DataManager
    //=========================================================================
    const DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const contents = DataManager_makeSaveContents.call(this);
        contents[SAVE_KEY_MARKERS] = markers;
        return contents;
    }

    const DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        DataManager_extractSaveContents.call(this, contents);
        markers = contents[SAVE_KEY_MARKERS] ?? markers;
    }
})();