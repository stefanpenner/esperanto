import packageResult from 'utils/packageResult';
import standaloneUmdIntro from 'utils/umd/standaloneUmdIntro';
import strictUmdIntro from 'utils/umd/strictUmdIntro';
import requireName from 'utils/umd/requireName';
import transformBody from './utils/transformBody';
import getImportSummary from './utils/getImportSummary';
import getExportObjectName from 'utils/getExportObjectName';

export default function umd ( mod, body, options ) {
	requireName( options );

	var [ importPaths, importNames ] = getImportSummary( mod );

	var hasImports = mod.imports.length > 0;
	var hasExports = mod.exports.length > 0;
	var exportObject = getExportObjectName( mod );

	var intro;
	if (!hasImports && !hasExports) {
		intro = standaloneUmdIntro({
			amdName: options.amdName,
		}, body.getIndentString() );
	} else {
		intro = strictUmdIntro({
			hasExports,
			importPaths,
			importNames,
			amdName: options.amdName,
			absolutePaths: options.absolutePaths,
			name: options.name,
			exportObject,
		}, body.getIndentString() );
	}

	transformBody( mod, body, {
		intro: intro,
		outro: '\n\n}));',
		exportObject,
	});

	return packageResult( body, options, 'toUmd' );
}
