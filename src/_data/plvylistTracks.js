/** @format */

/**
 * An album following the Plvylist conventions but used to compile into a larger dataset.
 * @typedef PlvylistAlbumMeta
 * @property {string} title Name of the album.
 * @property {string} albumUrl URL to the album.
 * @property {string} artist Name of the artist.
 * @property {string} artistUrl URL to the artist.
 * @property {string} artwork Set of tracks for this album.
 * @property {PlvylistTrackMeta[]} tracks Set of tracks for this album.
 */

/**
 * Shortened Plvylist track data.
 * @typedef {Object} PlvylistTrackMeta
 * @property {string} title Name of the track.
 * @property {string} file Path to the track file.
 */

/**
 * Full set of fields Plvylist can expect on a track.
 * @typedef PlvylistTrack
 * @property {string} file Path to the track file with extension.
 * @property {string} title Track title.
 * @property {string} artist Track artist.
 * @property {string} artistUrl URL to the track's artist.
 * @property {string} album Album title.
 * @property {string} albumUrl URL to the track's album.
 * @property {string} artwork Path to the album art file with extension.
 */

/**
 * Collection of information for a musical artist.
 * @typedef {Object} ArtistProfile
 * @property {string} name Name of the artist.
 * @property {string} bandcamp URL to artist's Bandcamp page.
 */

/**
 * troyalllowercase artist profile.
 * @type {ArtistProfile}
 */
class Troyalllowercase {
	static name = "troyalllowercase";
	static bandcamp = "https://troyalllowercase.bandcamp.com";
}

class Album {
	constructor(directory, albumName) {
		this.directory = directory;
		this.name = albumName;
	}
}

function CreateTrack(album) {
	return class {
		album = album;

		/**
		 * Generate a track's file path under a base directory that auto completes the album name.
		 * @param {string} file File name with extension.
		 * @returns {string} Track file path.
		 */
		generateTrackPath(file) {
			return `${this.album?.directory}/troy/${this.album?.name}/${file}`;
		}
	};
}

function CreateAlbum(title, path, artwork) {
	return class {
		title = title;
		albumUrl = `${Troyalllowercase.bandcamp}/${path}`;
		artist = Troyalllowercase.name;
		artistUrl = Troyalllowercase.bandcamp;
		artwork = artwork;
	};
}

class AloneInACrowdedRoomTrack extends CreateTrack(
	new Album("v1631305734", "alone-in-a-crowded-room"),
) {
	constructor(title, fileName) {
		super();
		this.title = title;
		this.file = this.generateTrackPath(fileName);
	}
}

class LetsTryThisAgainTrack extends CreateTrack(
	new Album("v1684975533", "lets-try-this-again"),
) {
	constructor(title, fileName) {
		super();
		this.title = title;
		this.file = this.generateTrackPath(fileName);
	}
}

/** @type {PlvylistAlbumMeta} */
class AloneInACrowdedRoom extends CreateAlbum(
	"Alone In A Crowded Room",
	"/album/alone-in-a-crowded-room",
	"c_scale,f_auto,q_auto:eco,w_300/v1631306010/troy/alone-in-a-crowded-room/AIACR-troy_cwoizg.png",
) {
	tracks = [
		new AloneInACrowdedRoomTrack(
			"I Know I'm Not",
			"01_I_Know_I_m_Not_jvp3af.mp3",
		),
		new AloneInACrowdedRoomTrack("Baby Blue", "02_Baby_Blue_lwf7zf.mp3"),
		new AloneInACrowdedRoomTrack("Insincerity", "03_Insincerity_x29pxf.mp3"),
		new AloneInACrowdedRoomTrack("Like Sinking", "04_Like_Sinking_ginqay.mp3"),
		new AloneInACrowdedRoomTrack("Do Better", "05_Do_Better_fdvpxz.mp3"),
		new AloneInACrowdedRoomTrack(
			"Market Street",
			"06_Market_Street_nrdgi4.mp3",
		),
		new AloneInACrowdedRoomTrack(
			"Alone In A Crowded Room",
			"07_Alone_In_a_Crowded_Room_zyrerb.mp3",
		),
		new AloneInACrowdedRoomTrack(
			"Long Time Caller, First Time Listener",
			"08_Long_Time_Caller_First_Time_List_plvy7c.mp3",
		),
		new AloneInACrowdedRoomTrack("Detroit", "09_Detroit_uvrmff.mp3"),
		new AloneInACrowdedRoomTrack(
			"We Can't Rush These Things",
			"10_We_Can_t_Rush_These_Things_mhhr0b.mp3",
		),
		new AloneInACrowdedRoomTrack("Closure", "11_Closure_ttfryn.mp3"),
		new AloneInACrowdedRoomTrack(
			"Like Drowning",
			"12_Like_Drowning_Bonus_Track_ta2ro5.mp3",
		),
	];
}

/** @type {PlvylistAlbumMeta} */
class LetsTryThisAgain extends CreateAlbum(
	"Let's try this again",
	"/album/lets-try-this-again",
	"c_scale,f_auto,q_auto:eco,w_300/v1684975617/troy/lets-try-this-again/artwork_y9iqv0.jpg",
) {
	tracks = [
		new LetsTryThisAgainTrack("Hello world", "01_-_Hello_world_ucdzel.mp3"),
		new LetsTryThisAgainTrack("In awe of you", "02_-_In_awe_of_you_cld3he.mp3"),
		new LetsTryThisAgainTrack("Flying high", "03_-_Flying_high_f156hs.mp3"),
		new LetsTryThisAgainTrack(
			"Shine bright or all hope is lost",
			"04_-_Shine_bright_or_all_hope_is_lost_gl2r2r.mp3",
		),
		new LetsTryThisAgainTrack("Dream state", "05_-_Dream_state_wceek9.mp3"),
		new LetsTryThisAgainTrack("Capstone", "06_-_Capstone_epehqk.mp3"),
		new LetsTryThisAgainTrack(
			"Doing it right this time",
			"07_-_Doing_it_right_this_time_ssfcod.mp3",
		),
		new LetsTryThisAgainTrack("Origin story", "08_-_Origin_story_ai7szz.mp3"),
		new LetsTryThisAgainTrack("Dizzy", "09_-_Dizzy_igczqk.mp3"),
		new LetsTryThisAgainTrack(
			"The final push",
			"10_-_The_final_push_optxvh.mp3",
		),
		new LetsTryThisAgainTrack(
			"On the decline",
			"11_-_On_the_decline_yuvql9.mp3",
		),
	];
}

export const LP1 = new AloneInACrowdedRoom();
export const LP2 = new LetsTryThisAgain();
