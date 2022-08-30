#!/usr/bin/node
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 166:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


exports.__esModule = true;
exports.ManifestTags = exports.RenditionTags = exports.VariantTags = exports.SegmentTags = void 0;
var byterange_1 = __nccwpck_require__(361);
var content_steering_1 = __nccwpck_require__(778);
var date_range_1 = __nccwpck_require__(451);
var define_1 = __nccwpck_require__(508);
var empty_tag_1 = __nccwpck_require__(764);
var i_frame_stream_inf_1 = __nccwpck_require__(375);
var image_stream_inf_1 = __nccwpck_require__(592);
var key_1 = __nccwpck_require__(422);
var map_1 = __nccwpck_require__(678);
var media_1 = __nccwpck_require__(686);
var numeric_tag_1 = __nccwpck_require__(180);
var part_1 = __nccwpck_require__(496);
var part_inf_1 = __nccwpck_require__(588);
var preload_hint_1 = __nccwpck_require__(989);
var rendition_report_1 = __nccwpck_require__(963);
var server_control_1 = __nccwpck_require__(521);
var session_data_1 = __nccwpck_require__(968);
var session_key_1 = __nccwpck_require__(383);
var skip_1 = __nccwpck_require__(897);
var start_1 = __nccwpck_require__(112);
var string_tag_1 = __nccwpck_require__(914);
var tiles_1 = __nccwpck_require__(359);
/**
 * Possible tag lines associated with a segment (camel-cased)
 */
exports.SegmentTags = {
    inf: string_tag_1.StringTag,
    programDateTime: string_tag_1.StringTag,
    key: key_1.Key,
    cueIn: string_tag_1.StringTag,
    cueOut: string_tag_1.StringTag,
    cueOutCont: string_tag_1.StringTag,
    scte35: string_tag_1.StringTag,
    asset: string_tag_1.StringTag,
    byterange: byterange_1.ByteRange,
    discontinuity: empty_tag_1.EmptyTag,
    map: map_1.Map,
    beacon: string_tag_1.StringTag,
    gap: empty_tag_1.EmptyTag,
    bitrate: numeric_tag_1.NumericTag,
    part: part_1.Part,
    tiles: tiles_1.Tiles
};
/**
 * Possible tag lines associated with a variant (camel-cased)
 */
exports.VariantTags = { streamInf: string_tag_1.StringTag };
/**
 * Possible tag lines associated with alternate renditions (camel-cased)
 */
exports.RenditionTags = {
    media: media_1.Media,
    iFrameStreamInf: i_frame_stream_inf_1.IFrameStreamInf,
    imageStreamInf: image_stream_inf_1.ImageStreamInf
};
/**
 * Tags that apply to manifest properties
 */
exports.ManifestTags = {
    m3u: empty_tag_1.EmptyTag,
    version: numeric_tag_1.NumericTag,
    contentSteering: content_steering_1.ContentSteering,
    define: define_1.Define,
    key: key_1.Key,
    map: map_1.Map,
    partInf: part_inf_1.PartInf,
    preloadHint: preload_hint_1.PreloadHint,
    renditionReport: rendition_report_1.RenditionReport,
    serverControl: server_control_1.ServerControl,
    sessionData: session_data_1.SessionData,
    sessionKey: session_key_1.SessionKey,
    start: start_1.Start,
    independentSegments: empty_tag_1.EmptyTag,
    targetduration: numeric_tag_1.NumericTag,
    mediaSequence: numeric_tag_1.NumericTag,
    discontinuitySequence: numeric_tag_1.NumericTag,
    endlist: empty_tag_1.EmptyTag,
    playlistType: string_tag_1.StringTag,
    iFramesOnly: empty_tag_1.EmptyTag,
    dateRange: date_range_1.DateRange,
    skip: skip_1.Skip
};


/***/ }),

/***/ 518:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


exports.__esModule = true;
exports.Manifest = void 0;
var manifest_1 = __nccwpck_require__(368);
exports.Manifest = manifest_1.Manifest;
var parse = function (hlsContent) { return new manifest_1.Manifest(hlsContent); };
exports["default"] = parse;


/***/ }),

/***/ 590:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


exports.__esModule = true;
exports.M3ULine = void 0;
var parse_attributes_1 = __nccwpck_require__(713);
var types_1 = __nccwpck_require__(263);
var util_1 = __nccwpck_require__(710);
var M3ULine = /** @class */ (function () {
    function M3ULine(content) {
        this.content = content;
        // If it's a tag
        var tagMatch = types_1.TAG_PATTERN.exec(this.content);
        if (tagMatch) {
            this.type = "TAG";
            this.tagName = tagMatch[1].toUpperCase();
            this.name = (0, util_1.toTagFriendlyName)(tagMatch[1]);
            this.value = tagMatch[2];
            this.attributes = (0, parse_attributes_1.parseAttributes)(tagMatch[2], this.name);
            return;
        }
        // Otherwise it's an Item
        this.type = "URI";
        this.tagName = "URI";
        this.name = "uri";
        this.value = this.content;
        this.attributes = {};
    }
    M3ULine.prototype.getBoolean = function (attributeKey, defaultValue) {
        var value = this.getString(attributeKey, null);
        return value === null ? defaultValue : value.toUpperCase() == "YES";
    };
    M3ULine.prototype.getString = function (attributeKey, defaultValue) {
        var value = this.getAttribute(attributeKey);
        return value !== undefined ? String(value) : defaultValue;
    };
    M3ULine.prototype.getStringArray = function (attributeKey, defaultValue) {
        var value = this.getAttribute(attributeKey);
        return Array.isArray(value)
            ? value.map(function (v) { return String(v); })
            : defaultValue;
    };
    M3ULine.prototype.getNumber = function (attributeKey, defaultValue) {
        var value = this.getAttribute(attributeKey);
        return value !== undefined ? Number(value) : defaultValue;
    };
    M3ULine.prototype.getAttribute = function (key) {
        return this.attributes[key];
    };
    M3ULine.prototype.hasAttribute = function (key, value) {
        if (this.attributes[key] === undefined)
            return false;
        if (value === undefined)
            return true;
        return this.getString(key, "").toLowerCase() == value.toLowerCase();
    };
    M3ULine.prototype.getUri = function () {
        if (this.type == "URI")
            return this.value;
        return this.getString("uri", null);
    };
    return M3ULine;
}());
exports.M3ULine = M3ULine;


/***/ }),

/***/ 361:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ByteRange = void 0;
var string_tag_1 = __nccwpck_require__(914);
var ByteRange = /** @class */ (function (_super) {
    __extends(ByteRange, _super);
    function ByteRange(line) {
        var _this = this;
        var _a;
        _this = _super.call(this, line) || this;
        _this.line = line;
        var valueArr = (_a = _this.value) === null || _a === void 0 ? void 0 : _a.split("@");
        _this.start = valueArr ? Number(valueArr[0]) : 0;
        _this.end = valueArr && valueArr[1] ? Number(valueArr[1]) : null;
        return _this;
    }
    return ByteRange;
}(string_tag_1.StringTag));
exports.ByteRange = ByteRange;


/***/ }),

/***/ 778:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.ContentSteering = void 0;
var ContentSteering = /** @class */ (function () {
    function ContentSteering(line) {
        this.line = line;
        this.serverUri = line.getString("serverUri", null);
        this.pathwayId = line.getString("pathwayId", ".");
    }
    return ContentSteering;
}());
exports.ContentSteering = ContentSteering;


/***/ }),

/***/ 451:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.DateRange = void 0;
var DateRange = /** @class */ (function () {
    function DateRange(line) {
        this.line = line;
        this.id = line.getString("id", null);
        this.startDate = line.getString("startDate", null);
        this.cue = line.getString("cue", null);
        this.endDate = line.getString("endDate", null);
        this.duration = line.getNumber("duration", null);
        this.plannedDuration = line.getNumber("plannedDuration", null);
        this.scte35In = line.getString("scte35In", null);
        this.scte35Out = line.getString("scte35Out", null);
        this.scte35Cmd = line.getString("scte35Cmd", null);
        this.endOnNext = line.getBoolean("endOnNext", false);
    }
    return DateRange;
}());
exports.DateRange = DateRange;


/***/ }),

/***/ 508:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Define = void 0;
var Define = /** @class */ (function () {
    function Define(line) {
        this.line = line;
        this.name = line.getString("name", null);
        this.value = line.getString("value", null);
        this["import"] = line.getString("import", null);
    }
    return Define;
}());
exports.Define = Define;


/***/ }),

/***/ 764:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.EmptyTag = void 0;
var EmptyTag = /** @class */ (function () {
    function EmptyTag(line) {
        this.line = line;
    }
    return EmptyTag;
}());
exports.EmptyTag = EmptyTag;


/***/ }),

/***/ 375:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.IFrameStreamInf = void 0;
var IFrameStreamInf = /** @class */ (function () {
    function IFrameStreamInf(line) {
        this.line = line;
        this.uri = line.getString("uri", null);
        this.bandwidth = line.getNumber("bandwidth", null);
        this.averageBandwidth = line.getNumber("averageBandwidth", null);
        this.score = line.getNumber("score", null);
        this.codecs = line.getStringArray("codecs", []);
        this.supplementalCodecs = line.getStringArray("supplementalCodecs", []);
        this.videoRange = line.getString("videoRange", "sdr");
        this.resolution = line.getString("resolution", null);
        this.hdcpLevel = line.getString("hdcpLevel", null);
        this.allowedCpc = line.getStringArray("allowedCpc", []);
        this.stableVariantId = line.getString("stableVariantId", null);
        this.video = line.getString("video", null);
        this.pathwayId = line.getString("pathwayId", ".");
    }
    return IFrameStreamInf;
}());
exports.IFrameStreamInf = IFrameStreamInf;


/***/ }),

/***/ 592:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.ImageStreamInf = void 0;
var ImageStreamInf = /** @class */ (function () {
    function ImageStreamInf(line) {
        this.line = line;
        this.bandwidth = line.getNumber("bandwidth", null);
        this.codecs = line.getStringArray("codecs", []);
        this.uri = line.getString("uri", null);
        this.resolution = line.getString("resolution", null);
        this.video = line.getString("video", null);
    }
    return ImageStreamInf;
}());
exports.ImageStreamInf = ImageStreamInf;


/***/ }),

/***/ 422:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Key = void 0;
var Key = /** @class */ (function () {
    function Key(line) {
        this.line = line;
        this.method = line.getString("method", "NONE");
        this.uri = line.getString("uri", null);
        this.keyformat = line.getString("keyformat", "identity");
        this.keyformatversions = line.getString("keyformatversions", "1");
    }
    return Key;
}());
exports.Key = Key;


/***/ }),

/***/ 368:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


exports.__esModule = true;
exports.Manifest = exports.isSegmentPropertyLine = exports.isVariantPropertyLine = exports.isRenditionPropertyLine = exports.isVodManifest = exports.isMasterManifest = void 0;
var variant_1 = __nccwpck_require__(122);
var segment_1 = __nccwpck_require__(276);
var rendition_report_1 = __nccwpck_require__(963);
var preload_hint_1 = __nccwpck_require__(989);
var util_1 = __nccwpck_require__(710);
var hls_rules_1 = __nccwpck_require__(166);
var i_frame_stream_inf_1 = __nccwpck_require__(375);
var image_stream_inf_1 = __nccwpck_require__(592);
var media_1 = __nccwpck_require__(686);
var start_1 = __nccwpck_require__(112);
var define_1 = __nccwpck_require__(508);
var part_inf_1 = __nccwpck_require__(588);
var server_control_1 = __nccwpck_require__(521);
var key_1 = __nccwpck_require__(422);
var map_1 = __nccwpck_require__(678);
var isMasterManifest = function (lines) {
    return lines.some(function (line) { return line.name === "streamInf"; });
};
exports.isMasterManifest = isMasterManifest;
var isVodManifest = function (lines) {
    return lines.some(function (line) { return line.name === "endlist"; });
};
exports.isVodManifest = isVodManifest;
var isRenditionPropertyLine = function (line) {
    return (0, util_1.isTagLine)(line) && Object.keys(hls_rules_1.RenditionTags).includes(line.name || "");
};
exports.isRenditionPropertyLine = isRenditionPropertyLine;
var isVariantPropertyLine = function (line) {
    return (0, util_1.isTagLine)(line) && Object.keys(hls_rules_1.VariantTags).includes(line.name || "");
};
exports.isVariantPropertyLine = isVariantPropertyLine;
var isSegmentPropertyLine = function (line) {
    return (0, util_1.isTagLine)(line) && Object.keys(hls_rules_1.SegmentTags).includes(line.name || "");
};
exports.isSegmentPropertyLine = isSegmentPropertyLine;
var Manifest = /** @class */ (function () {
    function Manifest(content) {
        this.lines = [];
        this.segments = [];
        this.variants = [];
        this.iFrameRenditions = [];
        this.imageRenditions = [];
        this.audioRenditions = [];
        this.videoRenditions = [];
        this.subtitlesRenditions = [];
        this.closedCaptionsRenditions = [];
        this.totalDuration = 0;
        this.version = null;
        this.independentSegments = false;
        this.start = null;
        content = content.trim();
        if (!content.startsWith("#EXTM3U")) {
            throw new Error("Invalid M3U8 manifest");
        }
        this.lines = (0, util_1.parseLines)(content);
        this.type = (0, exports.isMasterManifest)(this.lines)
            ? "master"
            : (0, exports.isVodManifest)(this.lines)
                ? "vod"
                : "live";
        this.version = this.findNumber("EXT-X-VERSION", null);
        this.targetDuration = this.findNumber("EXT-X-TARGETDURATION", null);
        this.mediaSequence = this.findNumber("EXT-X-MEDIA-SEQUENCE", null);
        this.discontinuitySequence = this.findNumber("EXT-X-DISCONTINUITY-SEQUENCE", null);
        this.independentSegments = this.exists("EXT-X-INDEPENDENT-SEGMENTS");
        this.start = this.find("EXT-X-START", start_1.Start, null);
        this.define = this.collect("EXT-X-DEFINE", define_1.Define);
        this.keys = this.collect("EXT-X-KEY", key_1.Key);
        this.maps = this.collect("EXT-X-MAP", map_1.Map);
        this.endlist = this.exists("EXT-X-ENDLIST");
        this.iFramesOnly = this.exists("EXT-X-I-FRAMES-ONLY");
        this.imagesOnly = this.exists("EXT-X-IMAGES-ONLY");
        this.partInf = this.find("EXT-X-PART-INF", part_inf_1.PartInf, null);
        this.serverControl = this.find("EXT-X-SERVER-CONTROL", server_control_1.ServerControl, null);
        // Master Playlist
        if (this.type == "master") {
            this.variants = this.accumulate(function (line) { return line.type == "URI"; }, function (line) { return (0, exports.isVariantPropertyLine)(line); }, variant_1.Variant);
            this.iFrameRenditions = this.collect(function (line) { return line.tagName == "EXT-X-I-FRAME-STREAM-INF"; }, i_frame_stream_inf_1.IFrameStreamInf);
            this.imageRenditions = this.collect(function (line) { return line.tagName == "EXT-X-IMAGE-STREAM-INF"; }, image_stream_inf_1.ImageStreamInf);
            this.audioRenditions = this.collect(function (line) {
                return line.tagName == "EXT-X-MEDIA" && line.hasAttribute("type", "audio");
            }, media_1.Media);
            this.videoRenditions = this.collect(function (line) {
                return line.tagName == "EXT-X-MEDIA" && line.hasAttribute("type", "video");
            }, media_1.Media);
            this.subtitlesRenditions = this.collect(function (line) {
                return line.tagName == "EXT-X-MEDIA" &&
                    line.hasAttribute("type", "subtitles");
            }, media_1.Media);
            this.closedCaptionsRenditions = this.collect(function (line) {
                return line.tagName == "EXT-X-MEDIA" &&
                    line.hasAttribute("type", "closed-captions");
            }, media_1.Media);
        }
        // Chunklist
        else {
            this.segments = this.accumulate(function (line) { return line.type == "URI"; }, function (line) { return (0, exports.isSegmentPropertyLine)(line); }, segment_1.Segment);
            this.totalDuration = (0, util_1.calculateTotalDurationOfSegments)(this.segments);
        }
    }
    Object.defineProperty(Manifest.prototype, "renditionReports", {
        get: function () {
            return this.lines
                .filter(function (line) { return line.name == "renditionReport"; })
                .map(function (line) { return new rendition_report_1.RenditionReport(line); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Manifest.prototype, "preloadHints", {
        get: function () {
            return this.lines
                .filter(function (line) { return line.name == "preloadHint"; })
                .map(function (line) { return new preload_hint_1.PreloadHint(line); });
        },
        enumerable: false,
        configurable: true
    });
    Manifest.prototype.exists = function (key) {
        return (0, util_1.exists)(this.lines, key);
    };
    Manifest.prototype.findNumber = function (key, defaultValue) {
        return (0, util_1.findNumber)(this.lines, key, defaultValue);
    };
    Manifest.prototype.find = function (tagName, className, defaultValue) {
        return (0, util_1.find)(this.lines, tagName, className, defaultValue);
    };
    Manifest.prototype.collect = function (filter, className) {
        return (0, util_1.collect)(this.lines, filter, className);
    };
    Manifest.prototype.accumulate = function (until, filter, className) {
        return (0, util_1.accumulate)(this.lines, until, filter, className);
    };
    return Manifest;
}());
exports.Manifest = Manifest;


/***/ }),

/***/ 678:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Map = void 0;
var Map = /** @class */ (function () {
    function Map(line) {
        this.line = line;
        this.uri = line.getString("uri", null);
        this.byterange = line.getString("byterange", null);
    }
    return Map;
}());
exports.Map = Map;


/***/ }),

/***/ 686:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Media = void 0;
var Media = /** @class */ (function () {
    function Media(line) {
        this.line = line;
        this.name = line.getString("name", null);
        this.uri = line.getString("uri", null);
        this.type = line.getString("type", null);
        this.type = line.getString("type", null);
        this.groupId = line.getString("groupId", null);
        this.language = line.getString("language", null);
        this.assocLanguage = line.getString("assocLanguage", null);
        this.stableRenditionId = line.getString("stableRenditionId", null);
        this["default"] = line.getBoolean("default", false);
        this.autoselect = line.getBoolean("autoselect", false);
        this.forced = line.getBoolean("forced", false);
        this.instreamId = line.getString("instreamId", null);
        this.characteristics = line.getStringArray("characteristics", []);
        this.channels = line.getString("channels", null);
    }
    return Media;
}());
exports.Media = Media;


/***/ }),

/***/ 180:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.NumericTag = void 0;
var NumericTag = /** @class */ (function () {
    function NumericTag(line) {
        this.line = line;
        this.value = Number(line.value);
    }
    return NumericTag;
}());
exports.NumericTag = NumericTag;


/***/ }),

/***/ 588:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.PartInf = void 0;
var PartInf = /** @class */ (function () {
    function PartInf(line) {
        this.line = line;
        this.partTarget = line.getNumber("partTarget", null);
    }
    return PartInf;
}());
exports.PartInf = PartInf;


/***/ }),

/***/ 496:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Part = void 0;
var Part = /** @class */ (function () {
    function Part(line) {
        this.line = line;
        this.uri = line.getString("uri", null);
        this.duration = line.getNumber("duration", null);
        this.gap = this.line.getBoolean("gap", false);
        this.independent = this.line.getBoolean("independent", false);
        this.byterange = this.line.getString("byterange", null);
    }
    return Part;
}());
exports.Part = Part;


/***/ }),

/***/ 989:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.PreloadHint = void 0;
var PreloadHint = /** @class */ (function () {
    function PreloadHint(line) {
        this.line = line;
        this.uri = this.line.getString("uri", null);
        this.type = this.line.getString("type", null);
        this.byterangeStart = this.line.getNumber("byterangeStart", 0);
        this.byterangeLength = this.line.getNumber("byterangeLength", null);
    }
    return PreloadHint;
}());
exports.PreloadHint = PreloadHint;


/***/ }),

/***/ 963:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.RenditionReport = void 0;
var RenditionReport = /** @class */ (function () {
    function RenditionReport(line) {
        this.line = line;
        this.uri = this.line.getString("uri", null);
        this.lastMsn = this.line.getNumber("lastMsn", 0);
        this.lastPart = this.line.getNumber("lastPart", null);
    }
    return RenditionReport;
}());
exports.RenditionReport = RenditionReport;


/***/ }),

/***/ 276:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


exports.__esModule = true;
exports.Segment = void 0;
var util_1 = __nccwpck_require__(710);
var byterange_1 = __nccwpck_require__(361);
var part_1 = __nccwpck_require__(496);
var string_tag_1 = __nccwpck_require__(914);
var Segment = /** @class */ (function () {
    function Segment(uri, lines) {
        var _a;
        this.uri = uri;
        this.lines = lines;
        var extinf = lines.find(function (line) { return line.tagName == "EXTINF"; });
        if (!extinf)
            throw "Invalid segment. No EXTINF line.";
        var data = (extinf.value || "").split(",");
        this.duration = Number(data[0]);
        this.title = data[1] || null;
        this.parts = (0, util_1.collect)(lines, "EXT-X-PART", part_1.Part);
        this.discontinuity = (0, util_1.exists)(lines, "EXT-X-DISCONTINUITY");
        this.byteRange = (0, util_1.find)(lines, "EXT-X-BYTERANGE", byterange_1.ByteRange, null);
        this.programDate =
            ((_a = (0, util_1.find)(lines, "EXT-X-PROGRAM-DATE-TIME", string_tag_1.StringTag, null)) === null || _a === void 0 ? void 0 : _a.value) || null;
        this.isGap = (0, util_1.exists)(lines, "EXT-X-GAP");
        this.bitrate = (0, util_1.findNumber)(lines, "EXT-X-BITRATE", null);
    }
    return Segment;
}());
exports.Segment = Segment;


/***/ }),

/***/ 521:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.ServerControl = void 0;
var ServerControl = /** @class */ (function () {
    function ServerControl(line) {
        this.line = line;
        this.canSkipUntil = line.getNumber("canSkipUntil", null);
        this.canSkipDateRanges = line.getBoolean("canSkipDateRanges", null);
        this.holdBack = line.getNumber("holdBack", null);
        this.partHoldBack = line.getNumber("partHoldBack", null);
        this.canBlockReload = line.getBoolean("canBlockReload", false);
    }
    return ServerControl;
}());
exports.ServerControl = ServerControl;


/***/ }),

/***/ 968:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.SessionData = void 0;
var SessionData = /** @class */ (function () {
    function SessionData(line) {
        this.line = line;
        this.name = line.getString("name", null);
        this.value = line.getString("value", null);
        this.uri = line.getString("uri", null);
        this.language = line.getString("language", null);
    }
    return SessionData;
}());
exports.SessionData = SessionData;


/***/ }),

/***/ 383:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.SessionKey = void 0;
var SessionKey = /** @class */ (function () {
    function SessionKey(line) {
        this.line = line;
        this.method = line.getString("method", null);
        this.uri = line.getString("uri", null);
        this.keyformat = line.getString("keyformat", "identity");
        this.keyformatversions = line.getString("keyformatversions", "1");
    }
    return SessionKey;
}());
exports.SessionKey = SessionKey;


/***/ }),

/***/ 897:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Skip = void 0;
var Skip = /** @class */ (function () {
    function Skip(line) {
        this.line = line;
        this.skippedSegments = line.getNumber("skippedSegments", null);
        this.recentlyRemovedDateranges = line.getString("recentlyRemovedDateranges", "");
    }
    return Skip;
}());
exports.Skip = Skip;


/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Start = void 0;
var Start = /** @class */ (function () {
    function Start(line) {
        this.line = line;
        this.timeOffset = line.getNumber("timeOffset", 0);
        this.precise = line.getBoolean("precise", false);
    }
    return Start;
}());
exports.Start = Start;


/***/ }),

/***/ 914:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.StringTag = void 0;
var StringTag = /** @class */ (function () {
    function StringTag(line) {
        this.line = line;
        this.value = line.value;
    }
    return StringTag;
}());
exports.StringTag = StringTag;


/***/ }),

/***/ 359:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Tiles = void 0;
var Tiles = /** @class */ (function () {
    function Tiles(line) {
        this.line = line;
        this.resolution = line.getString("resolution", null);
        this.layout = line.getString("layout", null);
        this.duration = line.getNumber("duration", null);
    }
    return Tiles;
}());
exports.Tiles = Tiles;


/***/ }),

/***/ 122:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.Variant = void 0;
var Variant = /** @class */ (function () {
    function Variant(uri, lines) {
        this.uri = uri;
        this.lines = lines;
        var streaminf = lines.find(function (line) { return line.tagName == "EXT-X-STREAM-INF"; });
        if (!streaminf)
            throw "Invalid segment. No EXTINF line.";
        this.bandwidth = streaminf.getNumber("bandwidth", null);
        this.averageBandwidth = streaminf.getNumber("averageBandwidth", null);
        this.score = streaminf.getNumber("score", null);
        this.codecs = streaminf.getStringArray("codecs", []);
        this.supplementalCodecs = streaminf.getStringArray("supplementalCodecs", []);
        this.videoRange = streaminf.getString("videoRange", "sdr");
        this.resolution = streaminf.getString("resolution", null);
        this.frameRate = streaminf.getNumber("frameRate", null);
        this.hdcpLevel = streaminf.getString("hdcpLevel", null);
        this.allowedCpc = streaminf.getStringArray("allowedCpc", []);
        this.stableVariantId = streaminf.getString("stableVariantId", null);
        this.audio = streaminf.getString("audio", null);
        this.video = streaminf.getString("video", null);
        this.closedCaptions = streaminf.getString("closedCaptions", null);
        this.subtitles = streaminf.getString("subtitles", null);
        this.pathwayId = streaminf.getString("pathwayId", ".");
    }
    return Variant;
}());
exports.Variant = Variant;


/***/ }),

/***/ 713:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.parseAttributes = void 0;
var types_1 = __nccwpck_require__(263);
var util_1 = __nccwpck_require__(710);
var parseAttributePair = function (str, tag) {
    var pairs = str.trim().replace("=", "|").split("|");
    // Key-Value pair
    if (pairs.length == 2) {
        return {
            key: (0, util_1.toCamelCase)(pairs[0]),
            value: pairs[1].replace(/("|')/g, "")
        };
    }
    // Standalone value
    return {
        key: "value",
        value: pairs[0]
    };
};
var parseAttributes = function (str, tag) {
    if (tag === void 0) { tag = ""; }
    // Split the attribute string
    var matched = str.match(types_1.TAG_PAIR_SPLITTER);
    if (matched === null) {
        return {};
    }
    // Parse attributes
    var list = (function () {
        var _a;
        if (tag === "inf") {
            var duration = matched[0].split(" ");
            var additionalPairs_1 = [];
            // Additional attributes stuffed into the duration
            if (duration.length > 0) {
                duration
                    .splice(1)
                    .forEach(function (pairStr) {
                    return additionalPairs_1.push(parseAttributePair(pairStr, tag));
                });
            }
            // Compile into output
            return __spreadArray([
                { key: "duration", value: parseFloat(duration[0]) },
                { key: "title", value: (_a = matched[1]) === null || _a === void 0 ? void 0 : _a.trim() }
            ], additionalPairs_1, true);
        }
        return matched.map(function (pairStr) { return parseAttributePair(pairStr, tag); });
    })();
    // Insist on unique property names
    return list.reduce(function (all, current) {
        if (all[current.key] === undefined) {
            all[current.key] = current.value;
        }
        return all;
    }, {});
};
exports.parseAttributes = parseAttributes;


/***/ }),

/***/ 263:
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.TAG_PAIR_SPLITTER = exports.TAG_PATTERN = void 0;
exports.TAG_PATTERN = /#(?:-X-)?([^:]+):?(.*)$/;
exports.TAG_PAIR_SPLITTER = /([^,="]+)((="[^"]+")|(=[^,]+))*/g;


/***/ }),

/***/ 710:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


exports.__esModule = true;
exports.accumulate = exports.collect = exports.find = exports.findNumber = exports.exists = exports.calculateTotalDurationOfSegments = exports.isTagLine = exports.isUriLine = exports.isManifestPropertyLine = exports.parseLines = exports.coerce = exports.toCamelCase = exports.toTagFriendlyName = void 0;
var hls_rules_1 = __nccwpck_require__(166);
var m3u_line_1 = __nccwpck_require__(590);
var empty_tag_1 = __nccwpck_require__(764);
var numeric_tag_1 = __nccwpck_require__(180);
var toTagFriendlyName = function (tag) {
    if (tag.startsWith("EXT")) {
        tag = tag.substring(3);
    }
    return (0, exports.toCamelCase)(tag
        .split(/[- ]/)
        .filter(function (part) { return part.length > 0; })
        .filter(function (part, i) { return !(part === "X" && i == 0); })
        .join("-"));
};
exports.toTagFriendlyName = toTagFriendlyName;
var toCamelCase = function (str) {
    return str.split("-").reduce(function (all, c) {
        if (!all) {
            all += c.toLowerCase();
            return all;
        }
        all += c.charAt(0) + c.slice(1).toLowerCase();
        return all;
    }, "");
};
exports.toCamelCase = toCamelCase;
exports.coerce = {
    number: function (value) {
        return parseFloat(value);
    },
    integer: function (value) {
        return parseInt(value);
    },
    date: function (value) {
        return new Date(value);
    },
    string: function (value) {
        return String(value).trim();
    },
    stringArray: function (value) {
        return String(value).split(",");
    },
    boolean: function (value) {
        return value.toUpperCase() !== "NO";
    }
};
var parseLine = function (line) { return new m3u_line_1.M3ULine(line); };
var parseLines = function (content) {
    return content
        .split(/\r?\n/)
        // Filter out empty lines
        .filter(function (line) { return line.trim().length > 0; })
        // Filter out comment lines
        .filter(function (line) { return !line.startsWith("# "); })
        .map(function (line) { return parseLine(line); });
};
exports.parseLines = parseLines;
var isManifestPropertyLine = function (line) {
    return (0, exports.isTagLine)(line) &&
        line.name &&
        !Object.keys(hls_rules_1.SegmentTags).includes(line.name) &&
        !Object.keys(hls_rules_1.RenditionTags).includes(line.name) &&
        !Object.keys(hls_rules_1.VariantTags).includes(line.name);
};
exports.isManifestPropertyLine = isManifestPropertyLine;
var isUriLine = function (line) { return line.type === "URI" && !line.name; };
exports.isUriLine = isUriLine;
var isTagLine = function (line) { return line.type === "TAG" && !!line.name; };
exports.isTagLine = isTagLine;
var calculateTotalDurationOfSegments = function (segments) {
    return segments.reduce(function (sum, current) {
        var duration = (function () {
            var val = Number(current.duration);
            return isNaN(val) ? 0 : val;
        })();
        return sum + duration;
    }, 0);
};
exports.calculateTotalDurationOfSegments = calculateTotalDurationOfSegments;
var exists = function (lines, key) {
    return !!(0, exports.find)(lines, key, empty_tag_1.EmptyTag, false);
};
exports.exists = exists;
var findNumber = function (lines, key, defaultValue) {
    var _a;
    return ((_a = (0, exports.find)(lines, key, numeric_tag_1.NumericTag, undefined)) === null || _a === void 0 ? void 0 : _a.value) || defaultValue;
};
exports.findNumber = findNumber;
var find = function (lines, tagName, className, defaultValue) {
    var line = lines.find(function (line) { return line.tagName == tagName; });
    if (!line)
        return defaultValue;
    return new className(line);
};
exports.find = find;
var collect = function (lines, filter, className) {
    var matches = typeof filter == "string"
        ? lines.filter(function (line) { return line.tagName == filter; })
        : lines.filter(filter);
    return matches.map(function (line) { return new className(line); });
};
exports.collect = collect;
var accumulate = function (lines, until, filter, className) {
    var matches = [];
    return lines.reduce(function (list, line) {
        // If this is a URI line, this is the final one for this item
        if (until(line)) {
            list.push(new className(line.getUri() || "", matches));
            // Reset
            matches = [];
        }
        // Accumulate the tags
        else if (filter(line)) {
            matches.push(line);
        }
        return list;
    }, []);
};
exports.accumulate = accumulate;


/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs = __nccwpck_require__(147);
const index_1 = __nccwpck_require__(518);
const args = process.argv.slice(2);
var input = "";
if (args[0] == "-") {
    var stdinBuffer = fs.readFileSync(0);
    input = stdinBuffer.toString();
}
else {
    input = fs.readFileSync(args[0], "utf8");
}
const manifest = (0, index_1.default)(input);
console.log(JSON.stringify(manifest, null, 2));

})();

module.exports = __webpack_exports__;
/******/ })()
;