const TROY = "troyalllowercase";
const TROY_BANDCAMP = "https://troyalllowercase.bandcamp.com";
const CLOUD_PATH = "troy";

function generateTrackPath(dir, lp, file) {
	let path = lp === "1" ? "alone-in-a-crowded-room" : "lets-try-this-again";

	return `${dir}/${CLOUD_PATH}/${path}/${file}`;
}

const LP1 = {
	title: "Alone In A Crowded Room",
	albumUrl: `${TROY_BANDCAMP}/album/alone-in-a-crowded-room`,
	artist: TROY,
	artistUrl: TROY_BANDCAMP,
	artwork: "c_scale,f_auto,q_auto:eco,w_300/v1631306010/troy/alone-in-a-crowded-room/AIACR-troy_cwoizg.png",
	tracks: [
		{
			title: "I Know I'm Not",
			get file() {
				return generateTrackPath("v1631305734", "1", "01_I_Know_I_m_Not_jvp3af.mp3");
			},
		},
		{
			title: "Baby Blue",
			get file() {
				return generateTrackPath("v1631305724", "1", "02_Baby_Blue_lwf7zf.mp3");
			},
		},
		{
			title: "Insincerity",
			get file() {
				return generateTrackPath("v1631305729", "1", "03_Insincerity_x29pxf.mp3");
			},
		},
		{
			title: "Like Sinking",
			get file() {
				return generateTrackPath("v1631305723", "1", "04_Like_Sinking_ginqay.mp3");
			},
		},
		{
			title: "Do Better",
			get file() {
				return generateTrackPath("v1631305726", "1", "05_Do_Better_fdvpxz.mp3");
			},
		},
		{
			title: "Market Street",
			get file() {
				return generateTrackPath("v1631305732", "1", "06_Market_Street_nrdgi4.mp3");
			},
		},
		{
			title: "Alone In A Crowded Room",
			get file() {
				return generateTrackPath("v1631305735", "1", "07_Alone_In_a_Crowded_Room_zyrerb.mp3");
			},
		},
		{
			title: "Long Time Caller, First Time Listener",
			get file() {
				return generateTrackPath("v1631305740", "1", "08_Long_Time_Caller_First_Time_List_plvy7c.mp3");
			},
		},
		{
			title: "Detroit",
			get file() {
				return generateTrackPath("v1631305733", "1", "09_Detroit_uvrmff.mp3");
			},
		},
		{
			title: "We Can't Rush These Things",
			get file() {
				return generateTrackPath("v1631305740", "1", "10_We_Can_t_Rush_These_Things_mhhr0b.mp3");
			},
		},
		{
			title: "Closure",
			get file() {
				return generateTrackPath("v1631305741", "1", "11_Closure_ttfryn.mp3");
			},
		},
		{
			title: "Like Drowning",
			get file() {
				return generateTrackPath("v1631305740", "1", "12_Like_Drowning_Bonus_Track_ta2ro5.mp3");
			},
		},
	],
};

const LP2 = {
	title: "Let's try this again",
	albumUrl: `${TROY_BANDCAMP}/album/lets-try-this-again`,
	artist: TROY,
	artistUrl: TROY_BANDCAMP,
	artwork: "c_scale,f_auto,q_auto:eco,w_300/v1684975617/troy/lets-try-this-again/artwork_y9iqv0.jpg",
	tracks: [
		{
			title: "Hello world",
			get file() {
				return generateTrackPath("v1684975417", "2", "01_-_Hello_world_ucdzel.mp3");
			},
		},
		{
			title: "In awe of you",
			get file() {
				return generateTrackPath("v1684975538", "2", "02_-_In_awe_of_you_cld3he.mp3");
			},
		},
		{
			title: "Flying high",
			get file() {
				return generateTrackPath("v1684975559", "2", "03_-_Flying_high_f156hs.mp3");
			},
		},
		{
			title: "Shine bright or all hope is lost",
			get file() {
				return generateTrackPath("v1684975580", "2", "04_-_Shine_bright_or_all_hope_is_lost_gl2r2r.mp3");
			},
		},
		{
			title: "Dream state",
			get file() {
				return generateTrackPath("v1684975533", "2", "05_-_Dream_state_wceek9.mp3");
			},
		},
		{
			title: "Capstone",
			get file() {
				return generateTrackPath("v1684975564", "2", "06_-_Capstone_epehqk.mp3");
			},
		},
		{
			title: "Doing it right this time",
			get file() {
				return generateTrackPath("v1684975457", "2", "07_-_Doing_it_right_this_time_ssfcod.mp3");
			},
		},
		{
			title: "Origin story",
			get file() {
				return generateTrackPath("v1684975615", "2", "08_-_Origin_story_ai7szz.mp3");
			},
		},
		{
			title: "Dizzy",
			get file() {
				return generateTrackPath("v1684975607", "2", "09_-_Dizzy_igczqk.mp3");
			},
		},
		{
			title: "The final push",
			get file() {
				return generateTrackPath("v1684975360", "2", "10_-_The_final_push_optxvh.mp3");
			},
		},
		{
			title: "On the decline",
			get file() {
				return generateTrackPath("v1684975612", "2", "11_-_On_the_decline_yuvql9.mp3");
			},
		},
	],
};

module.exports = {
	LP1,
	LP2,
};
