import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export function ProjectTableSkeleton() {
    return (
        <TableBody>
            {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-5 w-40" />
                        </div>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-20 rounded-md" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-5 w-12" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-5 w-24" />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}