import { ArtistCredit } from './ArtistCredit.tsx';
import { ISRC } from './ISRC.tsx';
import { pluralWithCount } from '@/utils/plural.ts';
import { flagEmoji } from '@/utils/regions.ts';
import { formatDuration } from '@/utils/time.ts';

import type { HarmonyMedium } from '@/harmonizer/types.ts';

type Props = {
	medium: HarmonyMedium;
	showTitle?: boolean;
};

export function Tracklist({ medium, showTitle = false }: Props) {
	return (
		<table class='tracklist'>
			{showTitle && (
				<caption>
					{medium.format ?? 'Medium'} {medium.number}
					{medium.title && `: ${medium.title}`}
				</caption>
			)}
			<thead>
				<tr>
					<th>Track</th>
					<th>Title</th>
					<th>Artists</th>
					<th>Length</th>
					<th>ISRC</th>
					{medium.tracklist.some((track) => track.availableIn) && <th>Availability</th>}
				</tr>
			</thead>
			{medium.tracklist.map((track) => {
				const regions = track.availableIn;
				return (
					<tr>
						<td class='numeric'>{track.number}</td>
						<td>{track.title}</td>
						<td>{track.artists && <ArtistCredit artists={track.artists} />}</td>
						<td class='numeric'>{formatDuration(track.length, { showMs: true })}</td>
						<td>
							{track.isrc && <ISRC code={track.isrc} />}
						</td>
						{regions && (
							<td>
								<span class='label'>
									<abbr title={regions.map(flagEmoji).join(' ')}>{pluralWithCount(regions.length, 'region')}</abbr>
								</span>
							</td>
						)}
					</tr>
				);
			})}
		</table>
	);
}
