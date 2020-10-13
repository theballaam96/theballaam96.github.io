var navHtml = "\
	<div class='navbar'>\
		<div class='items'>\
			<div class='logo'>\
			</div>\
			<div class='links'>\
				<ul class='container text noselect'>\
					<li>\
						<a href='./home.html' class='nav_link'>\
							<span>\
								<strong>\
									Home\
								</strong>\
							</span>\
						</a>\
					</li>\
					<li>\
						<a href='https://www.speedrun.com/dk64' class='nav_link'>\
							<span>\
								<strong>\
									SRC Leaderboards\
								</strong>\
							</span>\
						</a>\
					</li>\
				</ul>\
			</div>\
		</div>\
	</div>";

document.getElementById("navigation").innerHTML = navHtml;

function homewarp() {
	window.location = "./home.html"
}