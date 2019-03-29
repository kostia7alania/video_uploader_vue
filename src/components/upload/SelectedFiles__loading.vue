<template>
  <tbody>
    <tr>
      <td colspan="6">
        <div class="loading-wrapper">
          <span class="loading-dna"></span>
        </div>
      </td>
    </tr>
    <tr class="list-item blur">
      <td cols="1">5</td>
      <td cols="2" class="text-center width200">
        <div class="video-player-div">
          <div
            class="video-unavailable"
            title="The video preview is unavailable"
          >
            <div class="video-unavailable--message"> 
              <i class="fas fa-video-slash fa-x"></i><span> &nbsp; N/A </span>
            </div>
          </div>
          <div class="status--message">
            <div class="duration">00:10:56</div>
          </div>
        </div>
      </td>
      <td cols="3"><b> Loading Loading Loading.mp4 </b></td>
      <td cols="3" class="info-column">
        <div class="info-column col">
          <div class="type size-success"><b>Size:</b> 6.8 MB</div>
          <div class="type type-success"><b>Type:</b> 3gpp (video)</div>
          <div><b>Modified:</b> 1/25/2018 <br />6:28:13 PM</div>
          <div><b>Duration:</b> 00:10:56</div>
        </div>
      </td>
      <td cols="2">
        <div>
          <textarea
            id="textarea-state"
            placeholder="Type your comment.."
            rows="5"
            wrap="soft"
            class="form-control"
          ></textarea>
        </div>
      </td>
      <td cols="1">
        <div align="center">
          <div>
            <button class="btn" title="Send the file">
              <font-awesome-icon :icon="['fa','share-square']"/><!--<i class="far fa-share-square"></i>-->
            </button>
            <button class="btn">
              <font-awesome-icon :icon="['fa','trash-alt']"/><!--<i class="far fa-trash-alt"></i>-->
            </button>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "Selected-Videos__loading"
};
</script>

<style lang="scss">
.blur {
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}

.loading-wrapper {
  position: relative;
}
.loading-dna {
  z-index: 99999;
  position: absolute;
  display: block;
  top: 3em;
}

.loading-dna {
  /*width: 85px;*/
  height: 85px;
  width: 100%;
  background-repeat-x: repeat;
  background-image: url("data:image/svg+xml,%3Csvg class='lds-dna' width='85px' height='85px' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' style='background: none;'%3E%3Ccircle cx='6.451612903225806' cy='54.7088' r='2.48'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-0.5s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='0s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-0.5s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='6.451612903225806' cy='45.2912' r='3.52'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-1.5s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-0.5s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='16.129032258064512' cy='41.0843' r='2.56'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-0.7s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-0.2s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-0.7s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='16.129032258064512' cy='58.9157' r='3.44'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-1.7s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1.2s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-0.7s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='25.806451612903224' cy='33.5217' r='2.8'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-0.9s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-0.4s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-0.9s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='25.806451612903224' cy='66.4783' r='3.2'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-1.9s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1.4s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-0.9s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='35.48387096774193' cy='32.0544' r='3.04'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-1.1s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-0.6s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-1.1s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='35.48387096774193' cy='67.9456' r='2.96'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-2.1s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1.6s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-1.1s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='45.16129032258064' cy='35.2019' r='3.28'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-1.3s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-0.8s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-1.3s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='45.16129032258064' cy='64.7981' r='2.72'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-2.3s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1.8s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-1.3s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='54.838709677419345' cy='45.2912' r='3.52'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-1.5s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-1.5s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='54.838709677419345' cy='54.7088' r='2.48'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-2.5s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-2s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-1.5s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='64.51612903225805' cy='58.9157' r='3.44'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-1.7s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1.2s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-1.7s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='64.51612903225805' cy='41.0843' r='2.56'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-2.7s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-2.2s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-1.7s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='74.19354838709677' cy='66.4783' r='3.2'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-1.9s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1.4s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-1.9s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='74.19354838709677' cy='33.5217' r='2.8'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-2.9s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-2.4s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-1.9s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='83.87096774193547' cy='67.9456' r='2.96'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-2.1s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1.6s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-2.1s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='83.87096774193547' cy='32.0544' r='3.04'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-3.1s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-2.6s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-2.1s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='93.54838709677418' cy='64.7981' r='2.72'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-2.3s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-1.8s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23941946;%23fbacc9;%23941946' dur='2s' repeatCount='indefinite' begin='-2.3s'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx='93.54838709677418' cy='35.2019' r='3.28'%3E%3Canimate attributeName='r' times='0;0.5;1' values='2.4000000000000004;3.5999999999999996;2.4000000000000004' dur='2s' repeatCount='indefinite' begin='-3.3s'%3E%3C/animate%3E%3Canimate attributeName='cy' keyTimes='0;0.5;1' values='32;68;32' dur='2s' repeatCount='indefinite' begin='-2.8s' keySplines='0.5 0 0.5 1;0.5 0 0.5 1' calcMode='spline'%3E%3C/animate%3E%3Canimate attributeName='fill' keyTimes='0;0.5;1' values='%23a2f0fb;%23164ba3;%23a2f0fb' dur='2s' repeatCount='indefinite' begin='-2.3s'%3E%3C/animate%3E%3C/circle%3E%3C/svg%3E");
}
</style>
