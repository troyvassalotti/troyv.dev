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
