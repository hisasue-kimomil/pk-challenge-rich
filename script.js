/* ============================================================
   PKチャレンジ — script.js
   ここに、自分の言葉で「何が起きるか」を書き出してみましょう
   （講義のおみくじと同じやり方。段0で書く）

   この課題で学びたいこと：今回は楽しさを追加してみる！

   class="hidariue-button" のボタンを押したときに
   1. 3つの乱数を決める（waku 1〜10、gk 1〜20、te 1〜10）
   2. waku が外す数以下なら「外れました」と出す
   3. 外れなかったとき、gk が読まれる数以下なら、キーパーが同じ方向に跳んだことにする
   4. 3のとき、te が届く数以下なら「止められました」、そうでなければ「手が届かない！ゴール！」と出す
   5. 2〜4のどれでもなければ「逆をついた！ゴール！」と出す
   6. 蹴った本数を1増やし、ゴールなら決めた本数も1増やす
   7. 5本蹴ったら、3本以上決めていれば「勝利」、そうでなければ「敗北」と出す
  8. 10000通りのうち何番目のシュートかを出す
  9. 結果に合わせて、キーパーの絵とボールの動きを変える
  10. 漫画風の効果音と、観客の声を出す
  11. 5本のマークを、結果の絵に替える
  12. 勝ち負けが決まったら色を変え、名言を出して、最初の画面に戻す
============================================================ */
let kicks = 0;
let goals = 0;
// ［左上］が押されたら、{ } の中を実行する
$(".hidariue-button").on("click", function () {
   if (goals === 3 || 5 - kicks + goals < 3) {
      return;
   }
   const muki = "左上";
   const bango = 0;
   const gyaku = "右下";
   const gx = "84px";
   const gy = "84px";
   const ox = "52px";
   const oy = "36px";
   console.log(muki);
   kicks = kicks + 1;
   $(".kick-text").html("【" + kicks + "本目】" + muki + "を狙った！");
   $(".meigen").hide();
   $(".ball").css({ left: "184px", top: "236px", width: "32px" });
   $(".crowd").attr("src", "images/crowd.svg");
   $(".sfx-shot").fadeIn(100);
   $(".sfx-shot").fadeOut(600);
   const waku = Math.ceil(Math.random() * 10);
   const gk = Math.ceil(Math.random() * 20);
   const te = Math.ceil(Math.random() * 10);
   console.log("waku:" + waku + " gk:" + gk + " te:" + te);
   const ban = bango * 2000 + (waku - 1) * 200 + (gk - 1) * 10 + te;
   $(".ban-text").html("10000通りのうち " + ban + "番目のシュート(枠" + waku + "・キーパー" + gk + "・手" + te + ")");

   console.log("押された");
   $(".result-text").html("蹴りました");
   const hazure = 3;
   const yomi = 2;
   const todoku = 5;
   if (waku <= hazure) {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: ox, top: oy, width: "24px" }, 500);
      $(".sfx").html("ヒュルルル…");
      $(".sfx").css({ color: "#bfd7e0" });
      $(".kansei").html("あぁ～…");
      $(".result-text").html("枠を外れました");
      $(".mark" + kicks).attr("src", "images/mark_out.svg");
   } else if (gk <= yomi) {
      if (te <= todoku) {
         $(".keeper").attr("src", "images/keeper_" + muki + ".svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".ball").animate({ left: "184px", top: "208px", width: "32px" }, 300);
         $(".sfx").html("バシィッ！！");
         $(".sfx").css({ color: "#ff5a5a" });
         $(".kansei").html("おおっ…！");
         $(".result-text").html("キーパーに読まれた！止められました。");
         $(".mark" + kicks).attr("src", "images/mark_save.svg");
      } else {
         $(".keeper").attr("src", "images/keeper_" + muki + "_todokanai.svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".sfx").html("ズバァッ！！");
         $(".sfx").css({ color: "#ffd23f" });
         $(".crowd").attr("src", "images/crowd_kanki.svg");
         $(".kansei").html("ワァァァッ…！");
         $(".result-text").html("読まれたけど手が届かない！ゴール！");
         $(".mark" + kicks).attr("src", "images/mark_goal.svg");
         goals = goals + 1;
      }
   } else {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
      $(".sfx").html("ズドォォン！！");
      $(".sfx").css({ color: "#ffd23f" });
      $(".crowd").attr("src", "images/crowd_kanki.svg");
      $(".kansei").html("ワァァァッ…！");
      $(".result-text").html("キーパーの逆をついた！ゴール！");
      goals = goals + 1;
      $(".mark" + kicks).attr("src", "images/mark_goal.svg");
   }
   $(".result-text").hide();
   $(".result-text").fadeIn();
   $(".keeper").hide();
   $(".keeper").fadeIn(250);
   $(".sfx").hide();
   $(".sfx").fadeIn(700);
   $(".kansei").hide();
   $(".kansei").fadeIn(900);
   $(".score-text").html("決めた本数" + goals + " あと" + (3 - goals) + "本で勝利");
   if (goals === 3 || 5 - kicks + goals < 3) {
      if (goals >= 3) {
         $(".score-text").html("★ " + kicks + "本中" + goals + "本！勝利！！ ★");
         $(".score-text").css({ "background-color": "#ffd23f", color: "#1f2a30", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#fff1b8" });
      } else {
         $(".score-text").html(kicks + "本中" + goals + "本。敗北...");
         $(".score-text").css({ "background-color": "#5b6b75", color: "#ffffff", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#dde3e7" });
      }
      $(".meigen").click();
   } else {
      $(".mark" + (kicks + 1)).attr("src", "images/mark_next.svg");
   }


});
// ［右上］が押されたら、{ } の中を実行する
$(".migiue-button").on("click", function () {
   if (goals === 3 || 5 - kicks + goals < 3) {
      return;
   }
   const muki = "右上";
   const bango = 1;
   const gyaku = "左下";
   const gx = "292px";
   const gy = "84px";
   const ox = "324px";
   const oy = "36px";
   console.log(muki);
   kicks = kicks + 1;
   $(".kick-text").html("【" + kicks + "本目】" + muki + "を狙った！");
   $(".meigen").hide();
   $(".ball").css({ left: "184px", top: "236px", width: "32px" });
   $(".crowd").attr("src", "images/crowd.svg");
   $(".sfx-shot").fadeIn(100);
   $(".sfx-shot").fadeOut(600);
   const waku = Math.ceil(Math.random() * 10);
   const gk = Math.ceil(Math.random() * 20);
   const te = Math.ceil(Math.random() * 10);
   console.log("waku:" + waku + " gk:" + gk + " te:" + te);
   const ban = bango * 2000 + (waku - 1) * 200 + (gk - 1) * 10 + te;
   $(".ban-text").html("10000通りのうち " + ban + "番目のシュート(枠" + waku + "・キーパー" + gk + "・手" + te + ")");

   console.log("押された");
   $(".result-text").html("蹴りました");
   const hazure = 3;
   const yomi = 2;
   const todoku = 5;
   if (waku <= hazure) {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: ox, top: oy, width: "24px" }, 500);
      $(".sfx").html("ヒュルルル…");
      $(".sfx").css({ color: "#bfd7e0" });
      $(".kansei").html("あぁ～…");
      $(".result-text").html("枠を外れました");
      $(".mark" + kicks).attr("src", "images/mark_out.svg");
   } else if (gk <= yomi) {
      if (te <= todoku) {
         $(".keeper").attr("src", "images/keeper_" + muki + ".svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".ball").animate({ left: "184px", top: "208px", width: "32px" }, 300);
         $(".sfx").html("バシィッ！！");
         $(".sfx").css({ color: "#ff5a5a" });
         $(".kansei").html("おおっ…！");
         $(".result-text").html("キーパーに読まれた！止められました。");
         $(".mark" + kicks).attr("src", "images/mark_save.svg");
      } else {
         $(".keeper").attr("src", "images/keeper_" + muki + "_todokanai.svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".sfx").html("ズバァッ！！");
         $(".sfx").css({ color: "#ffd23f" });
         $(".crowd").attr("src", "images/crowd_kanki.svg");
         $(".kansei").html("ワァァァッ…！");
         $(".result-text").html("読まれたけど手が届かない！ゴール！");
         $(".mark" + kicks).attr("src", "images/mark_goal.svg");
         goals = goals + 1;
      }
   } else {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
      $(".sfx").html("ズドォォン！！");
      $(".sfx").css({ color: "#ffd23f" });
      $(".crowd").attr("src", "images/crowd_kanki.svg");
      $(".kansei").html("ワァァァッ…！");
      $(".result-text").html("キーパーの逆をついた！ゴール！");
      goals = goals + 1;
      $(".mark" + kicks).attr("src", "images/mark_goal.svg");
   }
   $(".result-text").hide();
   $(".result-text").fadeIn();
   $(".keeper").hide();
   $(".keeper").fadeIn(250);
   $(".sfx").hide();
   $(".sfx").fadeIn(700);
   $(".kansei").hide();
   $(".kansei").fadeIn(900);
   $(".score-text").html("決めた本数" + goals + " あと" + (3 - goals) + "本で勝利");
   if (goals === 3 || 5 - kicks + goals < 3) {
      if (goals >= 3) {
         $(".score-text").html("★ " + kicks + "本中" + goals + "本！勝利！！ ★");
         $(".score-text").css({ "background-color": "#ffd23f", color: "#1f2a30", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#fff1b8" });
      } else {
         $(".score-text").html(kicks + "本中" + goals + "本。敗北...");
         $(".score-text").css({ "background-color": "#5b6b75", color: "#ffffff", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#dde3e7" });
      }
      $(".meigen").click();
   } else {
      $(".mark" + (kicks + 1)).attr("src", "images/mark_next.svg");
   }


});
// ［左下］が押されたら、{ } の中を実行する
$(".hidarishita-button").on("click", function () {
   if (goals === 3 || 5 - kicks + goals < 3) {
      return;
   }
   const muki = "左下";
   const bango = 2;
   const gyaku = "右上";
   const gx = "84px";
   const gy = "164px";
   const ox = "24px";
   const oy = "168px";
   console.log(muki);
   kicks = kicks + 1;
   $(".kick-text").html("【" + kicks + "本目】" + muki + "を狙った！");
   $(".meigen").hide();
   $(".ball").css({ left: "184px", top: "236px", width: "32px" });
   $(".crowd").attr("src", "images/crowd.svg");
   $(".sfx-shot").fadeIn(100);
   $(".sfx-shot").fadeOut(600);
   const waku = Math.ceil(Math.random() * 10);
   const gk = Math.ceil(Math.random() * 20);
   const te = Math.ceil(Math.random() * 10);
   console.log("waku:" + waku + " gk:" + gk + " te:" + te);
   const ban = bango * 2000 + (waku - 1) * 200 + (gk - 1) * 10 + te;
   $(".ban-text").html("10000通りのうち " + ban + "番目のシュート(枠" + waku + "・キーパー" + gk + "・手" + te + ")");

   console.log("押された");
   $(".result-text").html("蹴りました");
   const hazure = 1;
   const yomi = 4;
   const todoku = 10;
   if (waku <= hazure) {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: ox, top: oy, width: "24px" }, 500);
      $(".sfx").html("ヒュルルル…");
      $(".sfx").css({ color: "#bfd7e0" });
      $(".kansei").html("あぁ～…");
      $(".result-text").html("枠を外れました");
      $(".mark" + kicks).attr("src", "images/mark_out.svg");
   } else if (gk <= yomi) {
      if (te <= todoku) {
         $(".keeper").attr("src", "images/keeper_" + muki + ".svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".ball").animate({ left: "184px", top: "208px", width: "32px" }, 300);
         $(".sfx").html("バシィッ！！");
         $(".sfx").css({ color: "#ff5a5a" });
         $(".kansei").html("おおっ…！");
         $(".result-text").html("キーパーに読まれた！止められました。");
         $(".mark" + kicks).attr("src", "images/mark_save.svg");
      } else {
         $(".keeper").attr("src", "images/keeper_" + muki + "_todokanai.svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".sfx").html("ズバァッ！！");
         $(".sfx").css({ color: "#ffd23f" });
         $(".crowd").attr("src", "images/crowd_kanki.svg");
         $(".kansei").html("ワァァァッ…！");
         $(".result-text").html("読まれたけど手が届かない！ゴール！");
         $(".mark" + kicks).attr("src", "images/mark_goal.svg");
         goals = goals + 1;
      }
   } else {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
      $(".sfx").html("ズドォォン！！");
      $(".sfx").css({ color: "#ffd23f" });
      $(".crowd").attr("src", "images/crowd_kanki.svg");
      $(".kansei").html("ワァァァッ…！");
      $(".result-text").html("キーパーの逆をついた！ゴール！");
      goals = goals + 1;
      $(".mark" + kicks).attr("src", "images/mark_goal.svg");
   }
   $(".result-text").hide();
   $(".result-text").fadeIn();
   $(".keeper").hide();
   $(".keeper").fadeIn(250);
   $(".sfx").hide();
   $(".sfx").fadeIn(700);
   $(".kansei").hide();
   $(".kansei").fadeIn(900);
   $(".score-text").html("決めた本数" + goals + " あと" + (3 - goals) + "本で勝利");
   if (goals === 3 || 5 - kicks + goals < 3) {
      if (goals >= 3) {
         $(".score-text").html("★ " + kicks + "本中" + goals + "本！勝利！！ ★");
         $(".score-text").css({ "background-color": "#ffd23f", color: "#1f2a30", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#fff1b8" });
      } else {
         $(".score-text").html(kicks + "本中" + goals + "本。敗北...");
         $(".score-text").css({ "background-color": "#5b6b75", color: "#ffffff", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#dde3e7" });
      }
      $(".meigen").click();
   } else {
      $(".mark" + (kicks + 1)).attr("src", "images/mark_next.svg");
   }


});
// ［右下］が押されたら、{ } の中を実行する
$(".migishita-button").on("click", function () {
   if (goals === 3 || 5 - kicks + goals < 3) {
      return;
   }
   const muki = "右下";
   const bango = 3;
   const gyaku = "左上";
   const gx = "292px";
   const gy = "164px";
   const ox = "352px";
   const oy = "168px";
   console.log(muki);
   kicks = kicks + 1;
   $(".kick-text").html("【" + kicks + "本目】" + muki + "を狙った！");
   $(".meigen").hide();
   $(".ball").css({ left: "184px", top: "236px", width: "32px" });
   $(".crowd").attr("src", "images/crowd.svg");
   $(".sfx-shot").fadeIn(100);
   $(".sfx-shot").fadeOut(600);
   const waku = Math.ceil(Math.random() * 10);
   const gk = Math.ceil(Math.random() * 20);
   const te = Math.ceil(Math.random() * 10);
   console.log("waku:" + waku + " gk:" + gk + " te:" + te);
   const ban = bango * 2000 + (waku - 1) * 200 + (gk - 1) * 10 + te;
   $(".ban-text").html("10000通りのうち " + ban + "番目のシュート(枠" + waku + "・キーパー" + gk + "・手" + te + ")");

   console.log("押された");
   $(".result-text").html("蹴りました");
   const hazure = 1;
   const yomi = 4;
   const todoku = 10;
   if (waku <= hazure) {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: ox, top: oy, width: "24px" }, 500);
      $(".sfx").html("ヒュルルル…");
      $(".sfx").css({ color: "#bfd7e0" });
      $(".kansei").html("あぁ～…");
      $(".result-text").html("枠を外れました");
      $(".mark" + kicks).attr("src", "images/mark_out.svg");
   } else if (gk <= yomi) {
      if (te <= todoku) {
         $(".keeper").attr("src", "images/keeper_" + muki + ".svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".ball").animate({ left: "184px", top: "208px", width: "32px" }, 300);
         $(".sfx").html("バシィッ！！");
         $(".sfx").css({ color: "#ff5a5a" });
         $(".kansei").html("おおっ…！");
         $(".result-text").html("キーパーに読まれた！止められました。");
         $(".mark" + kicks).attr("src", "images/mark_save.svg");
      } else {
         $(".keeper").attr("src", "images/keeper_" + muki + "_todokanai.svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".sfx").html("ズバァッ！！");
         $(".sfx").css({ color: "#ffd23f" });
         $(".crowd").attr("src", "images/crowd_kanki.svg");
         $(".kansei").html("ワァァァッ…！");
         $(".result-text").html("読まれたけど手が届かない！ゴール！");
         $(".mark" + kicks).attr("src", "images/mark_goal.svg");
         goals = goals + 1;
      }
   } else {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
      $(".sfx").html("ズドォォン！！");
      $(".sfx").css({ color: "#ffd23f" });
      $(".crowd").attr("src", "images/crowd_kanki.svg");
      $(".kansei").html("ワァァァッ…！");
      $(".result-text").html("キーパーの逆をついた！ゴール！");
      goals = goals + 1;
      $(".mark" + kicks).attr("src", "images/mark_goal.svg");
   }
   $(".result-text").hide();
   $(".result-text").fadeIn();
   $(".keeper").hide();
   $(".keeper").fadeIn(250);
   $(".sfx").hide();
   $(".sfx").fadeIn(700);
   $(".kansei").hide();
   $(".kansei").fadeIn(900);
   $(".score-text").html("決めた本数" + goals + " あと" + (3 - goals) + "本で勝利");
   if (goals === 3 || 5 - kicks + goals < 3) {
      if (goals >= 3) {
         $(".score-text").html("★ " + kicks + "本中" + goals + "本！勝利！！ ★");
         $(".score-text").css({ "background-color": "#ffd23f", color: "#1f2a30", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#fff1b8" });
      } else {
         $(".score-text").html(kicks + "本中" + goals + "本。敗北...");
         $(".score-text").css({ "background-color": "#5b6b75", color: "#ffffff", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#dde3e7" });
      }
      $(".meigen").click();
   } else {
      $(".mark" + (kicks + 1)).attr("src", "images/mark_next.svg");
   }


});
// ［左上］が押されたら、{ } の中を実行する
$(".mannaka-button").on("click", function () {
   if (goals === 3 || 5 - kicks + goals < 3) {
      return;
   }
   const muki = "真ん中";
   const bango = 4;
   const gyaku = "左下";
   const gx = "188px";
   const gy = "124px";
   const ox = "188px";
   const oy = "34px";
   console.log(muki);
   kicks = kicks + 1;
   $(".kick-text").html("【" + kicks + "本目】" + muki + "を狙った！");
   $(".meigen").hide();
   $(".ball").css({ left: "184px", top: "236px", width: "32px" });
   $(".crowd").attr("src", "images/crowd.svg");
   $(".sfx-shot").fadeIn(100);
   $(".sfx-shot").fadeOut(600);
   const waku = Math.ceil(Math.random() * 10);
   const gk = Math.ceil(Math.random() * 20);
   const te = Math.ceil(Math.random() * 10);
   console.log("waku:" + waku + " gk:" + gk + " te:" + te);
   const ban = bango * 2000 + (waku - 1) * 200 + (gk - 1) * 10 + te;
   $(".ban-text").html("10000通りのうち " + ban + "番目のシュート(枠" + waku + "・キーパー" + gk + "・手" + te + ")");

   console.log("押された");
   $(".result-text").html("蹴りました");
   const hazure = 0;
   const yomi = 8;
   const todoku = 10;
   if (waku <= hazure) {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: ox, top: oy, width: "24px" }, 500);
      $(".sfx").html("ヒュルルル…");
      $(".sfx").css({ color: "#bfd7e0" });
      $(".kansei").html("あぁ～…");
      $(".result-text").html("枠を外れました");
      $(".mark" + kicks).attr("src", "images/mark_out.svg");
   } else if (gk <= yomi) {
      if (te <= todoku) {
         $(".keeper").attr("src", "images/keeper_" + muki + ".svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".ball").animate({ left: "184px", top: "208px", width: "32px" }, 300);
         $(".sfx").html("バシィッ！！");
         $(".sfx").css({ color: "#ff5a5a" });
         $(".kansei").html("おおっ…！");
         $(".result-text").html("キーパーに読まれた！止められました。");
         $(".mark" + kicks).attr("src", "images/mark_save.svg");
      } else {
         $(".keeper").attr("src", "images/keeper_" + muki + "_todokanai.svg");
         $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
         $(".sfx").html("ズバァッ！！");
         $(".sfx").css({ color: "#ffd23f" });
         $(".crowd").attr("src", "images/crowd_kanki.svg");
         $(".kansei").html("ワァァァッ…！");
         $(".result-text").html("読まれたけど手が届かない！ゴール！");
         $(".mark" + kicks).attr("src", "images/mark_goal.svg");
         goals = goals + 1;
      }
   } else {
      $(".keeper").attr("src", "images/keeper_" + gyaku + ".svg");
      $(".ball").animate({ left: gx, top: gy, width: "24px" }, 400);
      $(".sfx").html("ズドォォン！！");
      $(".sfx").css({ color: "#ffd23f" });
      $(".crowd").attr("src", "images/crowd_kanki.svg");
      $(".kansei").html("ワァァァッ…！");
      $(".result-text").html("キーパーの逆をついた！ゴール！");
      goals = goals + 1;
      $(".mark" + kicks).attr("src", "images/mark_goal.svg");
   }
   $(".result-text").hide();
   $(".result-text").fadeIn();
   $(".keeper").hide();
   $(".keeper").fadeIn(250);
   $(".sfx").hide();
   $(".sfx").fadeIn(700);
   $(".kansei").hide();
   $(".kansei").fadeIn(900);
   $(".score-text").html("決めた本数" + goals + " あと" + (3 - goals) + "本で勝利");
   if (goals === 3 || 5 - kicks + goals < 3) {
      if (goals >= 3) {
         $(".score-text").html("★ " + kicks + "本中" + goals + "本！勝利！！ ★");
         $(".score-text").css({ "background-color": "#ffd23f", color: "#1f2a30", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#fff1b8" });
      } else {
         $(".score-text").html(kicks + "本中" + goals + "本。敗北...");
         $(".score-text").css({ "background-color": "#5b6b75", color: "#ffffff", "border-color": "#1f2a30" });
         $(".wrapper").css({ "background-color": "#dde3e7" });
      }
      $(".meigen").click();
   } else {
      $(".mark" + (kicks + 1)).attr("src", "images/mark_next.svg");
   }


});

//［もう一回］が押されたら、本数を０に戻して結果を消す
$(".reset-button").on("click", function () {
   kicks = 0;
   goals = 0;
   $(".result-text").html("蹴る方向を選んでください");
   $(".score-text").html("5本中3本決めたら勝利");
   $(".kick-text").html("PKチャレンジ　スタート！");
   $(".sfx").fadeOut();
   $(".kansei").fadeOut();
   $(".score-text").css({ "background-color": "transparent", color: "#1f2a30", "border-color": "transparent" });
   $(".wrapper").css({ "background-color": "#f4efe1" });
   $(".ban-text").html("1本ごとに　10000通りのどれかが起きます！");
   $(".ball").css({ left: "184px", top: "236px", width: "32px" });
   $(".keeper").attr("src", "images/keeper.svg");
   $(".crowd").attr("src", "images/crowd.svg");
   $(".mark1").attr("src", "images/mark_next.svg");
   $(".mark2").attr("src", "images/mark_mada.svg");
   $(".mark3").attr("src", "images/mark_mada.svg");
   $(".mark4").attr("src", "images/mark_mada.svg");
   $(".mark5").attr("src", "images/mark_mada.svg");
});

//名言の場所が押されたら（決着したときに自動で押される）、セリフを1つ選んで出す
$(".meigen").on("click", function () {
   const meigen = Math.ceil(Math.random() * 39);
   if (meigen === 1) { $(".meigen").html("「ちっぽけな細胞の寄せ集め1人、人生なんてくれてやれ。」<br>-財津（『ひゃくえむ。』魚豊）"); }
   if (meigen === 2) { $(".meigen").html("「ちっぽけな細胞の寄せ集め1人、人生なんてくれてやれ。」<br>-財津（『ひゃくえむ。』魚豊）"); }
   if (meigen === 3) { $(".meigen").html("「ちっぽけな細胞の寄せ集め1人、人生なんてくれてやれ。」<br>-財津（『ひゃくえむ。』魚豊）"); }
   if (meigen === 4) { $(".meigen").html("「ちっぽけな細胞の寄せ集め1人、人生なんてくれてやれ。」<br>-財津（『ひゃくえむ。』魚豊）"); }
   if (meigen === 5) { $(".meigen").html("「ちっぽけな細胞の寄せ集め1人、人生なんてくれてやれ。」<br>-財津（『ひゃくえむ。』魚豊）"); }
   if (meigen === 6) { $(".meigen").html("「ちっぽけな細胞の寄せ集め1人、人生なんてくれてやれ。」<br>-財津（『ひゃくえむ。』魚豊）"); }
   if (meigen === 7) { $(".meigen").html("「ちっぽけな細胞の寄せ集め1人、人生なんてくれてやれ。」<br>-財津（『ひゃくえむ。』魚豊）"); }
   if (meigen === 8) { $(".meigen").html("「現実ごときが俺の意志には追い付けない。」<br>-海棠（『ひゃくえむ。』魚豊）"); }
   if (meigen === 9) { $(".meigen").html("「現実ごときが俺の意志には追い付けない。」<br>-海棠（『ひゃくえむ。』魚豊）"); }
   if (meigen === 10) { $(".meigen").html("「現実ごときが俺の意志には追い付けない。」<br>-海棠（『ひゃくえむ。』魚豊）"); }
   if (meigen === 11) { $(".meigen").html("「現実ごときが俺の意志には追い付けない。」<br>-海棠（『ひゃくえむ。』魚豊）"); }
   if (meigen === 12) { $(".meigen").html("「現実ごときが俺の意志には追い付けない。」<br>-海棠（『ひゃくえむ。』魚豊）"); }
   if (meigen === 13) { $(".meigen").html("「現実ごときが俺の意志には追い付けない。」<br>-海棠（『ひゃくえむ。』魚豊）"); }
   if (meigen === 14) { $(".meigen").html("「僕らはいったい何のために走っているんだ」<br>-小宮（『ひゃくえむ。』魚豊）"); }
   if (meigen === 15) { $(".meigen").html("「そんなの当然、ガチになるため。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 16) { $(".meigen").html("「そんなの当然、ガチになるため。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 17) { $(".meigen").html("「そんなの当然、ガチになるため。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 18) { $(".meigen").html("「そんなの当然、ガチになるため。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 19) { $(".meigen").html("「僕らはいったい何のために走っているんだ」<br>-小宮（『ひゃくえむ。』魚豊）"); }
   if (meigen === 20) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 21) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 22) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 23) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 24) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 25) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 26) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 27) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 28) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 29) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 30) { $(".meigen").html("「たいていのことは100mだけ誰よりも速ければ全部解決する」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 31) { $(".meigen").html("「現実より辛いことをすると現実がぼやける」<br>-小宮（『ひゃくえむ。』魚豊）"); }
   if (meigen === 32) { $(".meigen").html("「現実より辛いことをすると現実がぼやける」<br>-小宮（『ひゃくえむ。』魚豊）"); }
   if (meigen === 33) { $(".meigen").html("「現実より辛いことをすると現実がぼやける」<br>-小宮（『ひゃくえむ。』魚豊）"); }
   if (meigen === 34) { $(".meigen").html("「俺たちが本気で本気でいることの幸福感を一ミリも奪えない。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 35) { $(".meigen").html("「俺たちが本気で本気でいることの幸福感を一ミリも奪えない。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 36) { $(".meigen").html("「俺たちが本気で本気でいることの幸福感を一ミリも奪えない。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 37) { $(".meigen").html("「俺たちが本気で本気でいることの幸福感を一ミリも奪えない。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 38) { $(".meigen").html("「俺たちが本気で本気でいることの幸福感を一ミリも奪えない。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   if (meigen === 39) { $(".meigen").html("「俺たちが本気で本気でいることの幸福感を一ミリも奪えない。」<br>-トガシ（『ひゃくえむ。』魚豊）"); }
   $(".meigen").hide();
   $(".meigen").fadeIn(3000, function () {
      $(".reset-button").click();
   });
});