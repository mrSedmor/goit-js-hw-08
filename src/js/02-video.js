import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const VIDEOPLAYER_CURRENT_TIME_KEY = 'videoplayer-current-time';

const playerElem = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(playerElem);

restorePlayerTime();

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function restorePlayerTime() {
  const time = Number(localStorage.getItem(VIDEOPLAYER_CURRENT_TIME_KEY));
  if (time) {
    player.setCurrentTime(time);
  }
}

function onTimeUpdate(data) {
  localStorage.setItem(VIDEOPLAYER_CURRENT_TIME_KEY, data.seconds);
}
