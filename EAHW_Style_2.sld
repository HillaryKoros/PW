<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" version="1.0.0" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc">
  <UserLayer>
    <sld:LayerFeatureConstraints>
      <sld:FeatureTypeConstraint/>
    </sld:LayerFeatureConstraints>
    <sld:UserStyle>
      <sld:Name>_HOPPER_PROB_2017_dekad_20170101_1_1</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:RasterSymbolizer>
            <sld:ChannelSelection>
              <sld:GrayChannel>
                <sld:SourceChannelName>1</sld:SourceChannelName>
              </sld:GrayChannel>
            </sld:ChannelSelection>
            <sld:ColorMap type="ramp">
              <sld:ColorMapEntry quantity="0" color="#eaeaea" label="0"/>
              <sld:ColorMapEntry quantity="25" color="#ffebbf" label="25"/>
              <sld:ColorMapEntry quantity="50" color="#ffd37f" label="50"/>
              <sld:ColorMapEntry quantity="75" color="#ffaa00" label="75"/>
              <sld:ColorMapEntry quantity="98" color="#ff5500" label="98"/>
              <sld:ColorMapEntry quantity="99" opacity="0" color="#ff5500" label="99"/>
              <sld:ColorMapEntry quantity="100" opacity="0" color="#ff5500" label="100"/>
            </sld:ColorMap>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </UserLayer>
</StyledLayerDescriptor>
