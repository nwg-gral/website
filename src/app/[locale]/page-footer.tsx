import Image from "next/image";

import bmfLogo from "~/public/assets/images/logo-bmf.jpg";

export function PageFooter(): JSX.Element {
	return (
		<footer className="border-t border-secondary">
			<div className="mx-auto flex max-w-6xl px-6 py-4 sm:justify-center sm:px-8">
				<div className="grid content-center gap-0.5 text-xs sm:text-center sm:text-sm">
					<span className="font-medium">
						Nachwuchsgruppe &quot;Gelingensbedingungen rassismussensibler Lehrer:innenbildung&quot;
						(GraL)
					</span>
					<span>
						Universität Bielefeld | Fakultät für Erziehungswissenschaft, AG 10: Migrationspädagogik
						und Rassismuskritik | Universitätsstraße 25, 33615 Bielefeld
					</span>
					<span>
						<a
							className="transition hover:text-primary focus-visible:text-primary"
							href="mailto:gral@uni-bielefeld.de"
						>
							gral@uni-bielefeld.de
						</a>{" "}
						|{" "}
						<a
							className="transition hover:text-primary focus-visible:text-primary"
							href="https://www.nwg-gral.de"
						>
							www.nwg-gral.de
						</a>
					</span>
				</div>

				<Image alt="" className="h-32 w-32 object-contain sm:hidden" src={bmfLogo} />
			</div>
		</footer>
	);
}
