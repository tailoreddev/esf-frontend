jQuery( document ).ready(function($) {

	$(window).on('resize', function(){
		resize_map();
	});

	function resize_map(){
		if($(".tailored-maps").parent().width() > 400){
			$(".tailored-maps").parent().removeClass('narrow').addClass('wide');
		}else{
			$(".tailored-maps").parent().removeClass('wide').addClass('narrow');
		}
	}

	function tailored_maps(){
		$(".tailored-maps").each(function(i, Element) {
			var map,
				latlng = new google.maps.LatLng(0, 0),
				geocoder = new google.maps.Geocoder(),
				bounds = new google.maps.LatLngBounds(),
				panDistance = 128,
				markerCount = 0,
				markerCountStart = true,
				markers = $(Element).attr('data-maps'),
				$controlsUp = $(Element).next().find('button.pan-up'),
				$controlsDown = $(Element).next().find('button.pan-bottom'),
				$controlsLeft = $(Element).next().find('button.pan-left'),
				$controlsRight = $(Element).next().find('button.pan-right'),
				$controlsCenter = $(Element).next().find('button.center'),
				$controlsZoomIn = $(Element).next().find('button.zoom-in'),
				$controlsZoomOut = $(Element).next().find('button.zoom-out'),
				$controlsNext = $(Element).next().find('button.next-marker');
				$controlsPrev = $(Element).next().find('button.prev-marker'),
				styles = [{"featureType":"administrative.country","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#5fb4e8"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#e6eaed"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"invert_lightness":false},{"color":"#a3adb3"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#ffffff"}]}];

			$controlsUp.click(function(e){
				e.preventDefault();
				map.panBy(0, -panDistance);
			});

			$controlsDown.click(function(e){
				e.preventDefault();
				map.panBy(0, panDistance);
			});

			$controlsLeft.click(function(e){
				e.preventDefault();
				map.panBy(-panDistance, 0);
			});

			$controlsRight.click(function(e){
				e.preventDefault();
				map.panBy(panDistance, 0);
			});

			$controlsCenter.click(function(e){
				e.preventDefault();
				map.panTo(bounds.getCenter());
			});

			$controlsZoomIn.click(function(e){
				e.preventDefault();
				map.setZoom(map.getZoom() + 1);
			});

			$controlsZoomOut.click(function(e){
				e.preventDefault();
				map.setZoom(map.getZoom() - 1);
			});

			$controlsNext.click(function(e){
				e.preventDefault();
				markerCount++;
				if(markerCountStart === true){
					markerCount = 0;
					markerCountStart = false;
				}else if(markerCount > marker_array.length - 1){
					markerCount = 0;
				}
				map.panTo(marker_array[markerCount].getPosition());
				map.setCenter(marker_array[markerCount].getPosition());
				google.maps.event.trigger(marker_array[markerCount], "click");
			});

			$controlsPrev.click(function(e){
				e.preventDefault();
				markerCount--;
				if(markerCount < 0){
					 markerCount = marker_array.length - 1;
				}
				map.panTo(marker_array[markerCount].getPosition());
				map.setCenter(marker_array[markerCount].getPosition());
				google.maps.event.trigger(marker_array[markerCount], "click");
			});

			markers = jQuery.parseJSON(markers);

			marker_array = [];

			// Style
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

			// Create the map
			map = new google.maps.Map(Element, {
				disableDefaultUI: true,
				disableDoubleClickZoom: true,
				scrollwheel: false,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			});

			var infowindow = new google.maps.InfoWindow();

			$.each(markers, function(i, item) {

				marker = new google.maps.Marker({
					position: new google.maps.LatLng(markers[i].lat, markers[i].long),
					map: map,
					icon: markers[i].image
				});

				bounds.extend(marker.position);

				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infowindow.setContent(markers[i].markup);
						infowindow.open(map, marker);
					};
				})(marker, i));

				marker_array.push(marker);

			});

			// Center the map
			map.setCenter(bounds.getCenter());

			// Set style
			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');

			// Set the zoom level so that all markers fit in the map
			map.fitBounds(bounds);

			// Set tabindex on map canvas to make it take keyboard focus
			$(this).attr('tabIndex',0);

			$(this).keydown(function(e) {
				// If the keycode isn't in this group, stop right here
				if ([37, 38, 39, 40, 109, 189, 219, 107, 187, 221].indexOf(e.keyCode) == -1) {
					return;
				}

				e.preventDefault();
				e.stopPropagation();

				switch(e.keyCode) {
					case 37: // left arrow
						map.panBy(-panDistance, 0);
						break;
					case 38: // up arrow
						map.panBy(0, -panDistance);
						break;
					case 39: // right arrow
						map.panBy(panDistance, 0);
						break;
					case 40: // down arrow
						map.panBy(0, panDistance);
						break;
					case 109: // numpad -
					case 189: // minus
					case 219: // open bracket
						map.setZoom(map.getZoom() - 1);
						break;
					case 107: // numpad +
					case 187: // equal
					case 221: // close bracket
						map.setZoom(map.getZoom() + 1);
						break;
				}
			});
		});
	}
	resize_map();
	tailored_maps();

});